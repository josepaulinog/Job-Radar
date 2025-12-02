import { useState, useCallback } from 'react';
import { GoogleSearchItem, SearchError, StrategyType, DateRestrict } from '@/lib/types';
import { getStrategyQuery } from '@/lib/strategies';

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

  const executeSearch = useCallback(async (params: {
    apiKey: string;
    cxId: string;
    keywords: string;
    exclusions: string;
    strategy: StrategyType;
    dateRestrict?: DateRestrict;
    page?: number;
  }) => {
    const { apiKey, cxId, keywords, exclusions, strategy, dateRestrict, page = 1 } = params;

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

    // Build query
    const query = getStrategyQuery(strategy, keywords, exclusions);
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
          dateRestrict
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `API Error: ${response.status}`);
      }

      const data = await response.json();

      setState(prev => ({
        ...prev,
        results: data.items || [],
        totalResults: parseInt(data.searchInformation?.totalResults || '0'),
        isLoading: false,
        error: null
      }));

    } catch (error) {
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
