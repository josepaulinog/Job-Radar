'use client';

import { useState } from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import JobCard from '@/components/Results/JobCard';
import EmptyState from '@/components/Results/EmptyState';
import LoadingState from '@/components/Results/LoadingState';
import styles from './page.module.css';

export default function FavoritesPage() {
    const favorites = useFavorites();
    const [sortBy, setSortBy] = useState<'recent' | 'oldest'>('recent');

    const sortedFavorites = [...favorites.favorites].sort((a, b) => {
        if (sortBy === 'recent') {
            return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime();
        }
        return new Date(a.savedAt).getTime() - new Date(b.savedAt).getTime();
    });

    // Show loading state while favorites are being loaded from localStorage
    if (!favorites.mounted) {
        return (
            <div className={styles.container}>
                <LoadingState />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <div className={styles.headerIcon}>
                        <Heart size={32} />
                    </div>
                    <div>
                        <h1 className={styles.title}>Your Favorites</h1>
                        <p className={styles.subtitle}>
                            {favorites.count === 0
                                ? 'No saved jobs yet. Start searching and save your favorites!'
                                : `${favorites.count} saved ${favorites.count === 1 ? 'job' : 'jobs'}`
                            }
                        </p>
                    </div>
                </div>

                {favorites.count > 0 && (
                    <div className={styles.headerActions}>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as 'recent' | 'oldest')}
                            className={styles.sortSelect}
                        >
                            <option value="recent">Most Recent</option>
                            <option value="oldest">Oldest First</option>
                        </select>

                        <button
                            onClick={favorites.clearFavorites}
                            className={styles.clearBtn}
                            title="Clear all favorites"
                        >
                            <Trash2 size={16} />
                            Clear All
                        </button>
                    </div>
                )}
            </div>

            <div className={styles.favoritesGrid}>
                {favorites.count === 0 ? (
                    <div className={styles.emptyContainer}>
                        <EmptyState variant="no-results" />
                    </div>
                ) : (
                    sortedFavorites.map((job, index) => (
                        <JobCard
                            key={`${job.link}-${index}`}
                            job={job}
                            isFavorite={true}
                            onToggleFavorite={favorites.toggleFavorite}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
