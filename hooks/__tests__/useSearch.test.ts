import { renderHook, act, waitFor } from '@testing-library/react';
import { useSearch } from '../useSearch';

// Mock the validation module
jest.mock('@/lib/validation', () => ({
  validateApiKey: jest.fn((key) => key.startsWith('AIza')),
  validateCxId: jest.fn((cx) => cx.length > 10),
  sanitizeKeywords: jest.fn((kw) => kw.trim()),
  sanitizeExclusions: jest.fn((ex) => ex.trim()),
  sanitizeLocation: jest.fn((loc) => loc?.trim()),
}));

// Mock fetch
global.fetch = jest.fn();

describe('useSearch Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockReset();
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useSearch());

    expect(result.current.results).toEqual([]);
    expect(result.current.totalResults).toBe(0);
    expect(result.current.currentPage).toBe(1);
    expect(result.current.startIndex).toBe(1);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should validate missing credentials', async () => {
    const { result } = renderHook(() => useSearch());

    await act(async () => {
      await result.current.executeSearch({
        apiKey: '',
        cxId: '',
        keywords: 'test',
        exclusions: '',
        strategy: 'ats',
      });
    });

    expect(result.current.error).not.toBeNull();
    expect(result.current.error?.error).toBe('Missing Credentials');
  });

  it('should validate API key format', async () => {
    const { result } = renderHook(() => useSearch());

    await act(async () => {
      await result.current.executeSearch({
        apiKey: 'invalid-key',
        cxId: '1234567890abc',
        keywords: 'test',
        exclusions: '',
        strategy: 'ats',
      });
    });

    expect(result.current.error).not.toBeNull();
    expect(result.current.error?.error).toBe('Invalid API Key');
  });

  it('should validate CX ID format', async () => {
    const { result } = renderHook(() => useSearch());

    await act(async () => {
      await result.current.executeSearch({
        apiKey: 'AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        cxId: 'short',
        keywords: 'test',
        exclusions: '',
        strategy: 'ats',
      });
    });

    expect(result.current.error).not.toBeNull();
    expect(result.current.error?.error).toBe('Invalid Search Engine ID');
  });

  it('should execute successful search', async () => {
    const mockResponse = {
      items: [
        {
          title: 'Test Job',
          link: 'https://example.com/job',
          snippet: 'Test description',
          displayLink: 'example.com',
          htmlTitle: 'Test Job',
          htmlSnippet: 'Test description',
          formattedUrl: 'https://example.com/job',
          htmlFormattedUrl: 'https://example.com/job',
          kind: 'customsearch#result',
        },
      ],
      searchInformation: {
        totalResults: '100',
        searchTime: 0.5,
        formattedSearchTime: '0.50',
        formattedTotalResults: '100',
      },
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const { result } = renderHook(() => useSearch());

    await act(async () => {
      await result.current.executeSearch({
        apiKey: 'AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        cxId: '1234567890abc',
        keywords: 'React Developer',
        exclusions: '',
        strategy: 'ats',
      });
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.results.length).toBe(1);
    expect(result.current.totalResults).toBe(100);
    expect(result.current.error).toBeNull();
  });

  it('should handle API errors', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 403,
      json: async () => ({ message: 'API key invalid' }),
    });

    const { result } = renderHook(() => useSearch());

    await act(async () => {
      await result.current.executeSearch({
        apiKey: 'AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        cxId: '1234567890abc',
        keywords: 'React Developer',
        exclusions: '',
        strategy: 'ats',
      });
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).not.toBeNull();
    expect(result.current.error?.error).toBe('Search Failed');
  });

  it('should handle abort errors gracefully', async () => {
    const { result } = renderHook(() => useSearch());

    // Start first request
    const firstRequest = act(async () => {
      await result.current.executeSearch({
        apiKey: 'AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        cxId: '1234567890abc',
        keywords: 'React Developer',
        exclusions: '',
        strategy: 'ats',
      });
    });

    // Immediately start second request (should abort first)
    await act(async () => {
      await result.current.executeSearch({
        apiKey: 'AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        cxId: '1234567890abc',
        keywords: 'Vue Developer',
        exclusions: '',
        strategy: 'ats',
      });
    });

    // First request should be aborted, no error should be shown
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('should reset search state', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.resetSearch();
    });

    expect(result.current.results).toEqual([]);
    expect(result.current.totalResults).toBe(0);
    expect(result.current.currentPage).toBe(1);
    expect(result.current.error).toBeNull();
  });

  it('should change page correctly', () => {
    const { result } = renderHook(() => useSearch());

    // Setup initial state
    act(() => {
      result.current.changePage(1);
    });

    // Page should stay at 1 until there are results
    expect(result.current.currentPage).toBe(1);
  });
});
