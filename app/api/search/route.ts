import { NextRequest, NextResponse } from 'next/server';
import { SearchRequest, GoogleSearchResponse } from '@/lib/types';
import { batchSearch, executeSearchWithRetry } from '@/lib/batch-search';
import { processResults } from '@/lib/result-processing';

/**
 * API Route for Google Custom Search
 * Handles search requests and communicates with Google Custom Search API
 *
 * Features:
 * - Batch search across multiple ATS platforms
 * - Smart deduplication and result ranking
 * - Exponential backoff retry for rate limits
 * - Result processing and scoring
 *
 * Security: API keys are passed from client but never stored on server
 * Performance: Parallel batch searches with intelligent result processing
 */
export async function POST(request: NextRequest) {
  try {
    const body: SearchRequest & {
      useBatchSearch?: boolean;
      keywords?: string;
      location?: string;
      exclusions?: string;
    } = await request.json();

    const {
      apiKey,
      cxId,
      query,
      startIndex,
      dateRestrict,
      useBatchSearch = true,
      keywords,
      location,
      exclusions
    } = body;

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

    // Use batch search for first page (startIndex === 1) to get comprehensive results
    // For pagination, use regular search
    if (useBatchSearch && startIndex === 1) {
      console.log('Using batch search mode');

      try {
        const batchResult = await batchSearch(
          apiKey,
          cxId,
          keywords || query,
          location,
          exclusions,
          dateRestrict
        );

        // Process results: deduplicate and rank
        const processedItems = processResults(
          batchResult.items,
          keywords || query,
          location
        );

        // Build response matching Google API format
        const response: GoogleSearchResponse = {
          kind: 'customsearch#search',
          url: { type: 'application/json', template: '' },
          queries: {
            request: [{
              title: 'Google Custom Search',
              totalResults: batchResult.totalResults.toString(),
              searchTerms: query,
              count: processedItems.length,
              startIndex: 1,
              inputEncoding: 'utf8',
              outputEncoding: 'utf8',
              safe: 'off',
              cx: cxId
            }]
          },
          context: { title: 'JobRadar' },
          searchInformation: {
            searchTime: 0.5,
            formattedSearchTime: '0.50',
            totalResults: batchResult.totalResults.toString(),
            formattedTotalResults: batchResult.totalResults.toLocaleString()
          },
          items: processedItems
        };

        return NextResponse.json(response, {
          status: 200,
          headers: {
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
            'X-Batch-Search': 'true',
            'X-Batches-Executed': batchResult.batches.toString()
          }
        });
      } catch (batchError) {
        console.error('Batch search failed, falling back to regular search:', batchError);
        // Fall through to regular search
      }
    }

    // Regular search (for pagination or if batch search fails)
    console.log('Using regular search mode');

    // Use retry logic for regular search
    const data = await executeSearchWithRetry(
      apiKey,
      cxId,
      query,
      startIndex,
      dateRestrict
    );

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
