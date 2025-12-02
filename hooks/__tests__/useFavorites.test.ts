import { renderHook, act, waitFor } from '@testing-library/react';
import { useFavorites } from '../useFavorites';
import { GoogleSearchItem } from '@/lib/types';

const mockJob: GoogleSearchItem = {
  title: 'Test Job',
  link: 'https://example.com/job',
  snippet: 'Test description',
  displayLink: 'example.com',
  htmlTitle: 'Test Job',
  htmlSnippet: 'Test description',
  formattedUrl: 'https://example.com/job',
  htmlFormattedUrl: 'https://example.com/job',
  kind: 'customsearch#result',
};

describe('useFavorites Hook', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should initialize with empty favorites', async () => {
    const { result } = renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current.mounted).toBe(true);
    });

    expect(result.current.favorites).toEqual([]);
    expect(result.current.count).toBe(0);
  });

  it('should load favorites from localStorage on mount', async () => {
    const storedFavorites = [
      { ...mockJob, savedAt: '2024-01-01T00:00:00.000Z' },
    ];
    localStorage.setItem('jobhunter_favorites', JSON.stringify(storedFavorites));

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current.favorites.length).toBe(1);
    });

    expect(result.current.favorites[0].link).toBe(mockJob.link);
  });

  it('should add favorite', async () => {
    const { result } = renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current.mounted).toBe(true);
    });

    act(() => {
      result.current.addFavorite(mockJob);
    });

    await waitFor(() => {
      expect(result.current.count).toBe(1);
    });

    expect(result.current.favorites[0].link).toBe(mockJob.link);
    expect(result.current.favorites[0].savedAt).toBeDefined();
  });

  it('should not add duplicate favorites', async () => {
    const { result } = renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current.mounted).toBe(true);
    });

    act(() => {
      result.current.addFavorite(mockJob);
    });

    await waitFor(() => {
      expect(result.current.count).toBe(1);
    });

    act(() => {
      result.current.addFavorite(mockJob);
    });

    // Should still be 1
    expect(result.current.count).toBe(1);
  });

  it('should remove favorite', async () => {
    const { result } = renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current.mounted).toBe(true);
    });

    act(() => {
      result.current.addFavorite(mockJob);
    });

    await waitFor(() => {
      expect(result.current.count).toBe(1);
    });

    act(() => {
      result.current.removeFavorite(mockJob.link);
    });

    await waitFor(() => {
      expect(result.current.count).toBe(0);
    });
  });

  it('should check if job is favorite', async () => {
    const { result } = renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current.mounted).toBe(true);
    });

    expect(result.current.isFavorite(mockJob.link)).toBe(false);

    act(() => {
      result.current.addFavorite(mockJob);
    });

    await waitFor(() => {
      expect(result.current.isFavorite(mockJob.link)).toBe(true);
    });
  });

  it('should toggle favorite', async () => {
    const { result } = renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current.mounted).toBe(true);
    });

    act(() => {
      result.current.toggleFavorite(mockJob);
    });

    await waitFor(() => {
      expect(result.current.count).toBe(1);
    });

    act(() => {
      result.current.toggleFavorite(mockJob);
    });

    await waitFor(() => {
      expect(result.current.count).toBe(0);
    });
  });

  it('should clear all favorites', async () => {
    const { result } = renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current.mounted).toBe(true);
    });

    act(() => {
      result.current.addFavorite(mockJob);
      result.current.addFavorite({ ...mockJob, link: 'https://example.com/job2' });
    });

    await waitFor(() => {
      expect(result.current.count).toBe(2);
    });

    act(() => {
      result.current.clearFavorites();
    });

    await waitFor(() => {
      expect(result.current.count).toBe(0);
    });
  });

  it('should handle localStorage errors gracefully', async () => {
    // Mock localStorage.getItem to throw error
    const originalGetItem = localStorage.getItem;
    localStorage.getItem = jest.fn(() => {
      throw new Error('Storage error');
    });

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current.mounted).toBe(true);
    });

    // Should not crash, should return empty array
    expect(result.current.favorites).toEqual([]);

    // Restore original
    localStorage.getItem = originalGetItem;
  });

  it('should handle invalid JSON in localStorage', async () => {
    localStorage.setItem('jobhunter_favorites', 'invalid json');

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current.mounted).toBe(true);
    });

    // Should not crash, should return empty array
    expect(result.current.favorites).toEqual([]);
  });
});
