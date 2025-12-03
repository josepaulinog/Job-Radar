import { GoogleSearchItem } from './types';
import { extractCompany } from './utils';

/**
 * Normalizes a job title for comparison
 * Removes common variations and special characters
 */
function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ') // Remove special chars
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

/**
 * Creates a unique fingerprint for a job posting
 * Used for deduplication
 */
function createJobFingerprint(job: GoogleSearchItem): string {
  const company = extractCompany(job.displayLink, job.title);
  const title = normalizeTitle(job.title);
  return `${company}:${title}`.toLowerCase();
}

/**
 * Gets priority score for ATS platforms
 * Higher score = better quality platform
 */
function getAtsPriority(link: string): number {
  const priorityMap: Record<string, number> = {
    'greenhouse.io': 10,
    'lever.co': 9,
    'ashbyhq.com': 8,
    'workable.com': 7,
    'smartrecruiters.com': 6,
    'myworkdayjobs.com': 5,
    'icims.com': 4,
    'taleo.net': 3,
  };

  for (const [platform, priority] of Object.entries(priorityMap)) {
    if (link.includes(platform)) {
      return priority;
    }
  }

  return 1; // Default priority for unknown platforms
}

/**
 * Smart deduplication algorithm
 * Removes duplicate job postings, keeping the one from the best ATS platform
 */
export function deduplicateResults(results: GoogleSearchItem[]): GoogleSearchItem[] {
  const seen = new Map<string, GoogleSearchItem>();

  for (const job of results) {
    const fingerprint = createJobFingerprint(job);

    if (seen.has(fingerprint)) {
      const existing = seen.get(fingerprint)!;
      const currentPriority = getAtsPriority(job.link);
      const existingPriority = getAtsPriority(existing.link);

      // Keep the job from the higher priority platform
      if (currentPriority > existingPriority) {
        seen.set(fingerprint, job);
      }
    } else {
      seen.set(fingerprint, job);
    }
  }

  return Array.from(seen.values());
}

/**
 * Extracts posting age in days from snippet text
 * Returns -1 if age cannot be determined
 */
function extractPostingAge(snippet: string): number {
  const patterns = [
    /(\d+)\s*days?\s*ago/i,
    /(\d+)d\s*ago/i,
    /posted\s*(\d+)\s*days?\s*ago/i,
  ];

  for (const pattern of patterns) {
    const match = snippet.match(pattern);
    if (match) {
      return parseInt(match[1], 10);
    }
  }

  // Check for "today" or "yesterday"
  if (/today|just now/i.test(snippet)) return 0;
  if (/yesterday/i.test(snippet)) return 1;

  // Check for weeks
  const weeksMatch = snippet.match(/(\d+)\s*weeks?\s*ago/i);
  if (weeksMatch) {
    return parseInt(weeksMatch[1], 10) * 7;
  }

  // Check for months
  const monthsMatch = snippet.match(/(\d+)\s*months?\s*ago/i);
  if (monthsMatch) {
    return parseInt(monthsMatch[1], 10) * 30;
  }

  return -1; // Age unknown
}

/**
 * Scores a job result based on relevance factors
 * Higher score = more relevant
 */
export function scoreResult(
  job: GoogleSearchItem,
  searchKeywords: string,
  searchLocation?: string
): number {
  let score = 0;
  const titleLower = job.title.toLowerCase();
  const snippetLower = job.snippet.toLowerCase();
  const keywordsLower = searchKeywords.toLowerCase();

  // 1. Title relevance (highest weight: 0-50 points)
  if (titleLower.includes(keywordsLower)) {
    score += 50;
  } else {
    // Partial keyword matching
    const keywordWords = keywordsLower.split(' ').filter(w => w.length > 2);
    const titleWords = titleLower.split(' ');
    const matches = keywordWords.filter(kw => titleWords.some(tw => tw.includes(kw)));
    score += matches.length * 10;
  }

  // 2. Exact title match (bonus: 30 points)
  if (titleLower === keywordsLower) {
    score += 30;
  }

  // 3. Recency bonus (0-20 points)
  const daysOld = extractPostingAge(snippetLower);
  if (daysOld >= 0) {
    if (daysOld <= 3) score += 20; // Very fresh
    else if (daysOld <= 7) score += 15; // Fresh
    else if (daysOld <= 14) score += 10; // Recent
    else if (daysOld <= 30) score += 5; // This month
  }

  // 4. Location match (0-15 points)
  if (searchLocation && searchLocation !== 'remote') {
    const locationLower = searchLocation.toLowerCase();
    if (snippetLower.includes(locationLower) || titleLower.includes(locationLower)) {
      score += 15;
    }
  }

  // 5. Remote keyword match (10 points)
  if (!searchLocation || searchLocation === 'remote') {
    if (/\bremote\b|\bwork from home\b|\bwfh\b/i.test(snippetLower)) {
      score += 10;
    }
  }

  // 6. ATS platform quality (0-10 points)
  const platformPriority = getAtsPriority(job.link);
  score += platformPriority;

  // 7. Snippet quality (0-10 points)
  // Longer snippets with more context are typically better
  if (job.snippet.length > 200) score += 5;
  if (job.snippet.includes('$') || /\d+k/i.test(job.snippet)) score += 5; // Has salary info

  // 8. Company presence (5 points)
  if (job.displayLink && !job.displayLink.includes('jobs.')) {
    // Direct company site (not job board)
    score += 5;
  }

  return score;
}

/**
 * Sorts results by relevance score
 */
export function rankResults(
  results: GoogleSearchItem[],
  searchKeywords: string,
  searchLocation?: string
): GoogleSearchItem[] {
  return results
    .map(job => ({
      job,
      score: scoreResult(job, searchKeywords, searchLocation),
    }))
    .sort((a, b) => b.score - a.score)
    .map(({ job }) => job);
}

/**
 * Process search results: deduplicate and rank
 */
export function processResults(
  results: GoogleSearchItem[],
  searchKeywords: string,
  searchLocation?: string
): GoogleSearchItem[] {
  const deduplicated = deduplicateResults(results);
  const ranked = rankResults(deduplicated, searchKeywords, searchLocation);
  return ranked;
}
