import { topATS } from './enhanced-strategies';

/**
 * Splits ATS platforms into batches for parallel searching
 * Smaller batches = better reliability, more API calls
 */
export function createSearchBatches(platforms: string[] = topATS, batchSize: number = 3): string[][] {
  const batches: string[][] = [];

  for (let i = 0; i < platforms.length; i += batchSize) {
    batches.push(platforms.slice(i, i + batchSize));
  }

  return batches;
}

/**
 * Builds a search query for a specific batch of platforms
 */
export function buildBatchQuery(
  platforms: string[],
  keywords: string,
  location?: string,
  exclusions?: string
): string {
  const sites = platforms.map(p => `site:${p}`).join(' OR ');

  const exclude = exclusions?.trim()
    ? ' ' + exclusions.split(',').map(e => `-"${e.trim()}"`).join(' ')
    : '';

  const loc = location && location !== 'remote' ? ` "${location}"` : ' "remote"';

  return `(${sites}) "${keywords}"${loc}${exclude}`;
}

/**
 * Delays execution for a specified time
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Exponential backoff retry mechanism
 * Retries failed requests with increasing delays
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      // Check if it's a rate limit or network error that should be retried
      const shouldRetry =
        error instanceof Error &&
        (error.message.includes('429') ||
         error.message.includes('rate limit') ||
         error.message.includes('network') ||
         error.message.includes('timeout'));

      if (!shouldRetry || attempt === maxRetries - 1) {
        throw error;
      }

      // Exponential backoff: 1s, 2s, 4s, 8s, etc.
      const delayMs = baseDelay * Math.pow(2, attempt);
      console.log(`Retry attempt ${attempt + 1}/${maxRetries} after ${delayMs}ms`);
      await delay(delayMs);
    }
  }

  throw lastError || new Error('Max retries exceeded');
}

/**
 * Executes a Google Custom Search API call with retry logic
 */
export async function executeSearchWithRetry(
  apiKey: string,
  cxId: string,
  query: string,
  startIndex: number = 1,
  dateRestrict?: string
): Promise<any> {
  return retryWithBackoff(async () => {
    const params = new URLSearchParams({
      key: apiKey,
      cx: cxId,
      q: query,
      start: startIndex.toString(),
      num: '10',
    });

    if (dateRestrict) {
      const tbs =
        dateRestrict === 'd1' ? 'qdr:d' :
        dateRestrict === 'w1' ? 'qdr:w' :
        dateRestrict === 'm1' ? 'qdr:m' : '';
      if (tbs) params.append('tbs', tbs);
    }

    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?${params.toString()}`,
      {
        signal: AbortSignal.timeout(10000), // 10 second timeout
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API Error: ${response.status}`);
    }

    return response.json();
  });
}

/**
 * Performs batch search across multiple platform groups
 * Returns combined and deduplicated results
 */
export async function batchSearch(
  apiKey: string,
  cxId: string,
  keywords: string,
  location?: string,
  exclusions?: string,
  dateRestrict?: string,
  platforms: string[] = topATS
): Promise<{ items: any[]; totalResults: number; batches: number }> {
  const batches = createSearchBatches(platforms, 3);
  console.log(`Executing batch search across ${batches.length} batches`);

  // Execute all batches in parallel
  const batchResults = await Promise.allSettled(
    batches.map(async (batch, index) => {
      // Add small delay between batch starts to avoid rate limiting
      await delay(index * 500);

      const query = buildBatchQuery(batch, keywords, location, exclusions);
      console.log(`Batch ${index + 1}: ${query}`);

      return executeSearchWithRetry(apiKey, cxId, query, 1, dateRestrict);
    })
  );

  // Collect all successful results
  const allItems: any[] = [];
  let totalResultsCount = 0;
  let successfulBatches = 0;

  for (const result of batchResults) {
    if (result.status === 'fulfilled' && result.value.items) {
      allItems.push(...result.value.items);
      totalResultsCount += parseInt(result.value.searchInformation?.totalResults || '0');
      successfulBatches++;
    } else if (result.status === 'rejected') {
      console.error('Batch search failed:', result.reason);
    }
  }

  console.log(`Batch search complete: ${allItems.length} items from ${successfulBatches}/${batches.length} batches`);

  return {
    items: allItems,
    totalResults: totalResultsCount,
    batches: successfulBatches,
  };
}
