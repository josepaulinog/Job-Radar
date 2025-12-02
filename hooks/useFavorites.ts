import { useState, useCallback, useEffect } from 'react';
import { GoogleSearchItem } from '@/lib/types';

export interface FavoriteJob extends GoogleSearchItem {
    savedAt: string;
}

const FAVORITES_KEY = 'jobhunter_favorites';
const FAVORITES_EVENT = 'favorites-updated';

export function useFavorites() {
    const [favorites, setFavorites] = useState<FavoriteJob[]>([]);
    const [mounted, setMounted] = useState(false);

    // Load favorites from localStorage on mount
    useEffect(() => {
        setMounted(true);
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(FAVORITES_KEY);
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    setFavorites(parsed);
                } catch (error) {
                    console.error('Failed to parse favorites:', error);
                    setFavorites([]);
                }
            }
        }
    }, []);

    // Listen for favorites updates from other components/tabs
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === FAVORITES_KEY && e.newValue) {
                try {
                    const parsed = JSON.parse(e.newValue);
                    setFavorites(parsed);
                } catch (error) {
                    console.error('Failed to parse favorites from storage event:', error);
                }
            }
        };

        const handleCustomUpdate = () => {
            const stored = localStorage.getItem(FAVORITES_KEY);
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    setFavorites(parsed);
                } catch (error) {
                    console.error('Failed to parse favorites from custom event:', error);
                }
            }
        };

        // Listen for changes from other tabs
        window.addEventListener('storage', handleStorageChange);
        // Listen for changes from same page (custom event)
        window.addEventListener(FAVORITES_EVENT, handleCustomUpdate);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener(FAVORITES_EVENT, handleCustomUpdate);
        };
    }, []);

    // Save favorites to localStorage and dispatch event
    const saveFavorites = useCallback((newFavorites: FavoriteJob[]) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
            // Dispatch custom event on next tick to avoid setState during render
            setTimeout(() => {
                window.dispatchEvent(new Event(FAVORITES_EVENT));
            }, 0);
        }
    }, []);

    const addFavorite = useCallback((job: GoogleSearchItem) => {
        setFavorites(prev => {
            // Check if already favorited
            if (prev.some(fav => fav.link === job.link)) {
                return prev;
            }
            const updated = [...prev, { ...job, savedAt: new Date().toISOString() }];
            saveFavorites(updated);
            return updated;
        });
    }, [saveFavorites]);

    const removeFavorite = useCallback((jobLink: string) => {
        setFavorites(prev => {
            const updated = prev.filter(fav => fav.link !== jobLink);
            saveFavorites(updated);
            return updated;
        });
    }, [saveFavorites]);

    const isFavorite = useCallback((jobLink: string) => {
        return favorites.some(fav => fav.link === jobLink);
    }, [favorites]);

    const toggleFavorite = useCallback((job: GoogleSearchItem) => {
        if (isFavorite(job.link)) {
            removeFavorite(job.link);
        } else {
            addFavorite(job);
        }
    }, [isFavorite, addFavorite, removeFavorite]);

    const clearFavorites = useCallback(() => {
        setFavorites([]);
        saveFavorites([]);
    }, [saveFavorites]);

    return {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
        clearFavorites,
        count: favorites.length,
        mounted
    };
}
