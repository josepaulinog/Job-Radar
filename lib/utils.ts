import { GoogleSearchItem } from './types';

/**
 * Extracts company name from ATS URLs or domain
 */
export function extractCompany(displayLink: string, title: string): string {
  // Try to get company from common ATS patterns
  if (displayLink.includes('greenhouse.io')) {
    const match = displayLink.match(/boards\.greenhouse\.io\/([^\/]+)/);
    if (match) return formatCompanyName(match[1]);
  }

  if (displayLink.includes('lever.co')) {
    const match = displayLink.match(/jobs\.lever\.co\/([^\/]+)/);
    if (match) return formatCompanyName(match[1]);
  }

  if (displayLink.includes('ashbyhq.com')) {
    const match = displayLink.match(/jobs\.ashbyhq\.com\/([^\/]+)/);
    if (match) return formatCompanyName(match[1]);
  }

  // Fallback: use display link domain
  const domain = displayLink.replace(/^(www\.)?/, '').split('/')[0];
  return domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1);
}

/**
 * Formats company slug to readable name
 */
export function formatCompanyName(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

/**
 * Gets source label from display link
 */
export function getSourceLabel(displayLink: string): string {
  if (displayLink.includes('greenhouse.io')) return 'Greenhouse';
  if (displayLink.includes('lever.co')) return 'Lever';
  if (displayLink.includes('workable.com')) return 'Workable';
  if (displayLink.includes('ashbyhq.com')) return 'Ashby';
  if (displayLink.includes('breezy.hr')) return 'Breezy';
  if (displayLink.includes('jobvite.com')) return 'Jobvite';
  if (displayLink.includes('recruitee.com')) return 'Recruitee';
  if (displayLink.includes('reddit.com')) return 'Reddit';
  if (displayLink.includes('ycombinator.com')) return 'Hacker News';
  return 'Direct';
}

/**
 * Calculates total pages based on total results
 * Google Custom Search API limits: max 100 results total
 */
export function calculateTotalPages(totalResults: number): number {
  const maxResults = Math.min(totalResults, 100);
  return Math.ceil(maxResults / 10);
}

/**
 * Safely escapes HTML to prevent XSS
 */
export function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Validates API credentials format
 */
export function validateApiKey(key: string): boolean {
  // Google API keys typically start with "AIza" and are 39 characters
  return key.trim().length > 0 && key.startsWith('AIza');
}

export function validateCxId(cx: string): boolean {
  // Google Custom Search Engine IDs are typically alphanumeric with colons
  return cx.trim().length > 0 && /^[a-zA-Z0-9:_-]+$/.test(cx);
}

/**
 * Formats number with locale-specific thousands separator
 */
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

/**
 * Extracts job information from Google Search result
 */
export interface JobInfo {
  title: string;
  link: string;
  company: string;
  source: string;
  snippet: string;
  displayLink: string;
}

export function parseJobFromSearchResult(item: GoogleSearchItem): JobInfo {
  return {
    title: item.title,
    link: item.link,
    company: extractCompany(item.displayLink, item.title),
    source: getSourceLabel(item.displayLink),
    snippet: item.snippet || 'No description available.',
    displayLink: item.displayLink
  };
}
