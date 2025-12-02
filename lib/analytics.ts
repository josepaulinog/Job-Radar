/**
 * Analytics utilities for tracking user events
 * Uses Vercel Analytics for tracking
 */

import { track } from '@vercel/analytics';

/**
 * Track a search query
 */
export function trackSearch(params: {
  strategy: string;
  hasKeywords: boolean;
  hasExclusions: boolean;
  hasLocation: boolean;
  hasDateFilter: boolean;
}) {
  try {
    track('search_executed', params);
  } catch (error) {
    console.error('Failed to track search event:', error);
  }
}

/**
 * Track strategy selection
 */
export function trackStrategySelection(strategy: string) {
  try {
    track('strategy_selected', { strategy });
  } catch (error) {
    console.error('Failed to track strategy selection:', error);
  }
}

/**
 * Track favorites actions
 */
export function trackFavoriteAdded() {
  try {
    track('favorite_added');
  } catch (error) {
    console.error('Failed to track favorite added:', error);
  }
}

export function trackFavoriteRemoved() {
  try {
    track('favorite_removed');
  } catch (error) {
    console.error('Failed to track favorite removed:', error);
  }
}

export function trackFavoritesCleared(count: number) {
  try {
    track('favorites_cleared', { count });
  } catch (error) {
    console.error('Failed to track favorites cleared:', error);
  }
}

/**
 * Track query copy to clipboard
 */
export function trackQueryCopied(strategy: string) {
  try {
    track('query_copied', { strategy });
  } catch (error) {
    console.error('Failed to track query copy:', error);
  }
}

/**
 * Track errors
 */
export function trackError(params: {
  errorType: string;
  errorMessage: string;
  context?: string;
}) {
  try {
    track('error_occurred', params);
  } catch (error) {
    console.error('Failed to track error:', error);
  }
}

/**
 * Track pagination
 */
export function trackPagination(params: {
  direction: 'next' | 'previous';
  page: number;
}) {
  try {
    track('pagination_used', params);
  } catch (error) {
    console.error('Failed to track pagination:', error);
  }
}

/**
 * Track API configuration
 */
export function trackApiConfigured() {
  try {
    track('api_configured');
  } catch (error) {
    console.error('Failed to track API configuration:', error);
  }
}

/**
 * Track external link clicks
 */
export function trackExternalLink(params: {
  type: 'job_application' | 'google_search' | 'blog_post';
  url?: string;
}) {
  try {
    track('external_link_clicked', params);
  } catch (error) {
    console.error('Failed to track external link:', error);
  }
}

/**
 * Track page views for blog posts
 */
export function trackBlogView(slug: string, title: string) {
  try {
    track('blog_viewed', { slug, title });
  } catch (error) {
    console.error('Failed to track blog view:', error);
  }
}

/**
 * Track theme toggle
 */
export function trackThemeToggle(theme: 'light' | 'dark') {
  try {
    track('theme_toggled', { theme });
  } catch (error) {
    console.error('Failed to track theme toggle:', error);
  }
}
