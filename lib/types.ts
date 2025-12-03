// Core type definitions for JobRadar

export type Theme = 'light' | 'dark';

export type DateRestrict = '' | 'd1' | 'w1' | 'm1';

export type StrategyType = 'ats' | 'careers' | 'community' | 'docs' | 'jobBoards' | 'techCompanies';

export interface SearchStrategy {
  name: string;
  description: string;
  icon: string;
  color: 'blue' | 'green' | 'orange' | 'purple' | 'pink' | 'yellow';
  buildQuery: (keywords: string, exclusions: string, location?: string) => string;
}

export interface Location {
  name: string;
  value: string;
  isRemote: boolean;
}

export interface SearchState {
  apiKey: string;
  cxId: string;
  keywords: string;
  exclusions: string;
  dateRestrict: DateRestrict;
  strategy: StrategyType;
  location: string;
  currentPage: number;
  totalResults: number;
  startIndex: number;
}

export interface SavedSearch {
  id: string;
  keywords: string;
  exclusions: string;
  location: string;
  strategy: StrategyType;
  dateRestrict: DateRestrict;
  timestamp: number;
}

export interface FavoriteJob {
  id: string;
  title: string;
  link: string;
  company: string;
  source: string;
  snippet: string;
  timestamp: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  readTime: string;
  tags: string[];
  image?: string;
  content: string;
}

export interface GoogleSearchItem {
  kind: string;
  title: string;
  htmlTitle: string;
  link: string;
  displayLink: string;
  snippet: string;
  htmlSnippet: string;
  formattedUrl: string;
  htmlFormattedUrl: string;
  pagemap?: Record<string, any>;
  // Enhanced metadata
  category?: string;
  workLocation?: 'remote' | 'hybrid' | 'onsite' | 'unknown';
}

export interface GoogleSearchResponse {
  kind: string;
  url: {
    type: string;
    template: string;
  };
  queries: {
    request: Array<{
      title: string;
      totalResults: string;
      searchTerms: string;
      count: number;
      startIndex: number;
      inputEncoding: string;
      outputEncoding: string;
      safe: string;
      cx: string;
    }>;
    nextPage?: Array<{
      title: string;
      totalResults: string;
      searchTerms: string;
      count: number;
      startIndex: number;
      inputEncoding: string;
      outputEncoding: string;
      safe: string;
      cx: string;
    }>;
  };
  context?: {
    title: string;
  };
  searchInformation: {
    searchTime: number;
    formattedSearchTime: string;
    totalResults: string;
    formattedTotalResults: string;
  };
  items?: GoogleSearchItem[];
}

export interface SearchRequest {
  apiKey: string;
  cxId: string;
  query: string;
  startIndex: number;
  dateRestrict?: DateRestrict;
}

export interface SearchError {
  error: string;
  message: string;
  details?: string;
}

export interface ToastMessage {
  message: string;
  type?: 'success' | 'error' | 'info';
}
