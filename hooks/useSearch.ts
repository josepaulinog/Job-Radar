import { useState, useCallback, useRef } from 'react';
import { GoogleSearchItem, SearchError, StrategyType, DateRestrict } from '@/lib/types';
import { getStrategyQuery } from '@/lib/enhanced-strategies';
import {
  validateApiKey,
  validateCxId,
  sanitizeKeywords,
  sanitizeExclusions,
  sanitizeLocation
} from '@/lib/validation';
import { detectJobCategory } from '@/lib/job-categories';
import { detectWorkLocation } from '@/lib/work-location';

export interface UseSearchState {
  results: GoogleSearchItem[];
  totalResults: number;
  currentPage: number;
  startIndex: number;
  isLoading: boolean;
  error: SearchError | null;
}

export interface UseSearchReturn extends UseSearchState {
  executeSearch: (params: {
    apiKey: string;
    cxId: string;
    keywords: string;
    exclusions: string;
    strategy: StrategyType;
    location?: string;
    dateRestrict?: DateRestrict;
    page?: number;
  }) => Promise<void>;
  changePage: (delta: number) => void;
  resetSearch: () => void;
}

/**
 * Custom hook for managing search state and API calls
 */
export function useSearch(): UseSearchReturn {
  const [state, setState] = useState<UseSearchState>({
    results: [],
    totalResults: 0,
    currentPage: 1,
    startIndex: 1,
    isLoading: false,
    error: null
  });

  // Request deduplication
  const currentRequestIdRef = useRef<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const executeSearch = useCallback(async (params: {
    apiKey: string;
    cxId: string;
    keywords: string;
    exclusions: string;
    strategy: StrategyType;
    location?: string;
    dateRestrict?: DateRestrict;
    page?: number;
  }) => {
    const { apiKey, cxId, keywords, exclusions, strategy, location, dateRestrict, page = 1 } = params;

    // Abort previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    // Generate unique request ID for deduplication
    const requestId = `${Date.now()}-${Math.random()}`;
    currentRequestIdRef.current = requestId;

    // Validate credentials
    if (!apiKey || !cxId) {
      setState(prev => ({
        ...prev,
        error: {
          error: 'Missing Credentials',
          message: 'Please enter your Google API Key and Search Engine ID (CX) in the configuration panel.'
        },
        isLoading: false
      }));
      return;
    }

    // Validate API key format
    if (!validateApiKey(apiKey)) {
      setState(prev => ({
        ...prev,
        error: {
          error: 'Invalid API Key',
          message: 'The API key format appears to be invalid. Google API keys typically start with "AIza".',
          details: 'Please check your API key in the Google Cloud Console.'
        },
        isLoading: false
      }));
      return;
    }

    // Validate CX ID format
    if (!validateCxId(cxId)) {
      setState(prev => ({
        ...prev,
        error: {
          error: 'Invalid Search Engine ID',
          message: 'The Search Engine ID (CX) format appears to be invalid.',
          details: 'Please check your CX in the Programmable Search Engine console.'
        },
        isLoading: false
      }));
      return;
    }

    // Sanitize inputs
    const sanitizedKeywords = sanitizeKeywords(keywords);
    const sanitizedExclusions = sanitizeExclusions(exclusions);
    const sanitizedLocation = location ? sanitizeLocation(location) : undefined;

    if (!sanitizedKeywords) {
      setState(prev => ({
        ...prev,
        error: {
          error: 'Invalid Keywords',
          message: 'Please enter valid search keywords.'
        },
        isLoading: false
      }));
      return;
    }

    // Build query with sanitized inputs
    const query = getStrategyQuery(strategy, sanitizedKeywords, sanitizedExclusions, sanitizedLocation);
    const startIndex = (page - 1) * 10 + 1;

    // Set loading state
    setState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      currentPage: page,
      startIndex
    }));

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey,
          cxId,
          query,
          startIndex,
          dateRestrict,
          // Additional params for batch search and result processing
          useBatchSearch: true,
          keywords: sanitizedKeywords,
          location: sanitizedLocation,
          exclusions: sanitizedExclusions
        }),
        signal: abortController.signal
      });

      // Check if this request is still current
      if (currentRequestIdRef.current !== requestId) {
        // Request was superseded, ignore results
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API Error: ${response.status}`);
      }

      const data = await response.json();

      // Double-check request is still current before updating state
      if (currentRequestIdRef.current !== requestId) {
        return;
      }

      // Enrich results with metadata (category and work location)
      const enrichedResults = (data.items || []).map((item: GoogleSearchItem) => ({
        ...item,
        category: detectJobCategory(item.title, item.snippet),
        workLocation: detectWorkLocation(item.title, item.snippet),
      }));

      setState(prev => ({
        ...prev,
        results: enrichedResults,
        totalResults: parseInt(data.searchInformation?.totalResults || '0'),
        isLoading: false,
        error: null
      }));

    } catch (error) {
      // Check if this is an abort error
      if (error instanceof Error && error.name === 'AbortError') {
        // Request was aborted, don't show error
        return;
      }

      // Check if request is still current
      if (currentRequestIdRef.current !== requestId) {
        return;
      }

      console.error('Search error:', error);

      let errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      let errorDetails = '';

      // Provide helpful error messages
      if (errorMessage.includes('API key')) {
        errorDetails = 'Your API key appears to be invalid. Please check it in the Google Cloud Console.';
      } else if (errorMessage.includes('cx') || errorMessage.includes('search engine')) {
        errorDetails = 'Your Search Engine ID (CX) appears to be invalid. Create one at Programmable Search Engine.';
      } else if (errorMessage.includes('quota') || errorMessage.includes('limit')) {
        errorDetails = "You've exceeded your daily quota of 100 free searches. You can wait until tomorrow or upgrade your quota.";
      } else if (errorMessage.includes('fetch')) {
        errorDetails = 'Network error. Please check your internet connection and try again.';
      }

      setState(prev => ({
        ...prev,
        isLoading: false,
        error: {
          error: 'Search Failed',
          message: errorMessage,
          details: errorDetails
        }
      }));
    }
  }, []);

  const changePage = useCallback((delta: number) => {
    setState(prev => {
      const newPage = prev.currentPage + delta;
      const maxResults = Math.min(prev.totalResults, 100);
      const totalPages = Math.ceil(maxResults / 10);

      if (newPage < 1 || newPage > totalPages) {
        return prev;
      }

      return {
        ...prev,
        currentPage: newPage,
        startIndex: (newPage - 1) * 10 + 1
      };
    });
  }, []);

  const resetSearch = useCallback(() => {
    setState({
      results: [],
      totalResults: 0,
      currentPage: 1,
      startIndex: 1,
      isLoading: false,
      error: null
    });
  }, []);

  return {
    ...state,
    executeSearch,
    changePage,
    resetSearch
  };
}
