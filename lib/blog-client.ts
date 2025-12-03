/**
 * Client-safe blog utilities
 * This file contains types and functions that can be safely imported by client components
 * without pulling in Node.js modules like 'fs'
 */

/**
 * Heading interface for table of contents
 */
export interface Heading {
  id: string;
  text: string;
  level: number;
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
