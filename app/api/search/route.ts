import { NextRequest, NextResponse } from 'next/server';
import { SearchRequest, GoogleSearchResponse } from '@/lib/types';

/**
 * API Route for Google Custom Search
 * Handles search requests and communicates with Google Custom Search API
 *
 * Security: API keys are passed from client but never stored on server
 * Performance: Direct passthrough to Google API with minimal processing
 */
export async function POST(request: NextRequest) {
  try {
    const body: SearchRequest = await request.json();
    const { apiKey, cxId, query, startIndex, dateRestrict } = body;

    // Validate required parameters
    if (!apiKey || !cxId || !query) {
      return NextResponse.json(
        {
          error: 'Missing Parameters',
          message: 'API Key, Search Engine ID (CX), and query are required'
        },
        { status: 400 }
      );
    }

    // Validate startIndex
    if (startIndex < 1 || startIndex > 91) {
      return NextResponse.json(
        {
          error: 'Invalid Parameters',
          message: 'Start index must be between 1 and 91'
        },
        { status: 400 }
      );
    }

    // Build Google Custom Search API URL
    const params = new URLSearchParams({
      key: apiKey,
      cx: cxId,
      q: query,
      start: startIndex.toString(),
      num: '10'
    });

    // Add optional date restriction
    if (dateRestrict && ['d1', 'w1', 'm1'].includes(dateRestrict)) {
      params.append('dateRestrict', dateRestrict);
    }

    const googleApiUrl = `https://www.googleapis.com/customsearch/v1?${params}`;

    // Make request to Google Custom Search API
    const response = await fetch(googleApiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      // Add timeout for better UX
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });

    // Handle non-OK responses from Google API
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      // Map Google API errors to user-friendly messages
      let errorMessage = errorData.error?.message || `Google API Error: ${response.status}`;
      let errorDetails = '';

      if (response.status === 400) {
        if (errorMessage.includes('API key')) {
          errorDetails = 'Invalid API key. Please check your credentials.';
        } else if (errorMessage.includes('cx')) {
          errorDetails = 'Invalid Search Engine ID (CX). Please check your credentials.';
        }
      } else if (response.status === 403) {
        errorDetails = 'API access forbidden. Please check your API key permissions.';
      } else if (response.status === 429) {
        errorDetails = 'Rate limit exceeded. You have used your daily quota of 100 searches.';
      }

      return NextResponse.json(
        {
          error: 'Google API Error',
          message: errorMessage,
          details: errorDetails
        },
        { status: response.status }
      );
    }

    // Parse and return successful response
    const data: GoogleSearchResponse = await response.json();

    // Return the data to client
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      }
    });

  } catch (error) {
    console.error('Search API error:', error);

    // Handle timeout errors
    if (error instanceof Error && error.name === 'TimeoutError') {
      return NextResponse.json(
        {
          error: 'Request Timeout',
          message: 'The search request took too long. Please try again.'
        },
        { status: 408 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred'
      },
      { status: 500 }
    );
  }
}

// Optional: Add GET endpoint for health check
export async function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      message: 'JobRadar Search API is running',
      version: '1.0.0'
    },
    { status: 200 }
  );
}
