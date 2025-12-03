'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { StrategyType, DateRestrict, GoogleSearchItem } from '@/lib/types';
import { getStrategyQuery, getGoogleSearchUrl } from '@/lib/enhanced-strategies';
import { WorkLocationType } from '@/lib/work-location';
import { useLocalStorage, useTheme } from '@/hooks/useLocalStorage';
import { useSearch } from '@/hooks/useSearch';
import { useToast } from '@/hooks/useToast';
import { useFavorites } from '@/hooks/useFavorites';
import {
  trackSearch,
  trackStrategySelection,
  trackQueryCopied,
  trackPagination,
  trackFavoriteAdded,
  trackFavoriteRemoved,
  trackError
} from '@/lib/analytics';
import { pageTransitionIn } from '@/lib/gsap-animations';

// Components
import Toast from '@/components/Toast';
import SearchContainer from '@/components/SearchContainer';
import ResultsContainer from '@/components/ResultsContainer';

import styles from './page.module.css';

export default function HomePage() {
  // Theme
  const { theme, toggleTheme } = useTheme();

  // Local storage state
  const [apiKey, setApiKey] = useLocalStorage('jobhunter_api_key', '');
  const [cxId, setCxId] = useLocalStorage('jobhunter_cx_id', '');

  // Search configuration
  const [keywords, setKeywords] = useState('WordPress Developer');
  const [exclusions, setExclusions] = useState('');
  const [dateRestrict, setDateRestrict] = useState<DateRestrict>('');
  const [strategy, setStrategy] = useState<StrategyType>('ats');
  const [location, setLocation] = useState('');

  // Filter state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedWorkLocations, setSelectedWorkLocations] = useState<WorkLocationType[]>([]);

  // UI state
  const [query, setQuery] = useState('');
  const [googleUrl, setGoogleUrl] = useState('');

  // Search hook
  const search = useSearch();

  // Favorites hook
  const favorites = useFavorites();

  // Toast hook
  const { toast, isVisible, showToast } = useToast();

  // Page transition animation
  useEffect(() => {
    pageTransitionIn({ duration: 0.8 });
  }, []);

  // Update query preview when inputs change
  useEffect(() => {
    const newQuery = getStrategyQuery(strategy, keywords, exclusions, location);
    setQuery(newQuery);
    setGoogleUrl(getGoogleSearchUrl(newQuery, dateRestrict));
  }, [keywords, exclusions, strategy, dateRestrict, location]);

  // Handle strategy selection (triggers search)
  const handleStrategySelect = async (newStrategy: StrategyType) => {
    setStrategy(newStrategy);

    // Track strategy selection
    trackStrategySelection(newStrategy);

    // Execute search with new strategy
    await search.executeSearch({
      apiKey,
      cxId,
      keywords,
      exclusions,
      strategy: newStrategy,
      location,
      dateRestrict,
      page: 1
    });
  };

  // Handle manual search
  const handleSearch = async () => {
    // Track search
    trackSearch({
      strategy,
      hasKeywords: !!keywords.trim(),
      hasExclusions: !!exclusions.trim(),
      hasLocation: !!location.trim(),
      hasDateFilter: !!dateRestrict
    });

    await search.executeSearch({
      apiKey,
      cxId,
      keywords,
      exclusions,
      strategy,
      location,
      dateRestrict,
      page: 1
    });
  };

  // Handle pagination
  const handlePageChange = async (delta: number) => {
    const newPage = search.currentPage + delta;

    // Track pagination
    trackPagination({
      direction: delta > 0 ? 'next' : 'previous',
      page: newPage
    });

    await search.executeSearch({
      apiKey,
      cxId,
      keywords,
      exclusions,
      strategy,
      location,
      dateRestrict,
      page: newPage
    });
  };

  // Handle copy query
  const handleCopyQuery = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(query).then(() => {
        showToast('Query copied to clipboard!');

        // Track query copy
        trackQueryCopied(strategy);
      });
    }
  };

  // Handle toggle favorite
  const handleToggleFavorite = (job: GoogleSearchItem) => {
    const isFav = favorites.isFavorite(job.link);
    favorites.toggleFavorite(job);
    showToast(isFav ? 'Removed from favorites' : 'Added to favorites');

    // Track favorite action
    if (isFav) {
      trackFavoriteRemoved();
    } else {
      trackFavoriteAdded();
    }
  };

  // Track errors when they occur
  useEffect(() => {
    if (search.error) {
      trackError({
        errorType: search.error.error,
        errorMessage: search.error.message,
        context: 'search'
      });
    }
  }, [search.error]);

  const apiConfigured = !!(apiKey && cxId);
  const hasSearched = search.results.length > 0 || search.error !== null;

  // Filter results based on selected categories and work locations
  const filteredResults = useMemo(() => {
    let filtered = search.results;

    // Filter by categories if any are selected
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(job =>
        job.category && selectedCategories.includes(job.category)
      );
    }

    // Filter by work locations if any are selected
    if (selectedWorkLocations.length > 0) {
      filtered = filtered.filter(job =>
        job.workLocation && selectedWorkLocations.includes(job.workLocation)
      );
    }

    return filtered;
  }, [search.results, selectedCategories, selectedWorkLocations]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* Search Sidebar */}
        <SearchContainer
          keywords={keywords}
          exclusions={exclusions}
          dateRestrict={dateRestrict}
          strategy={strategy}
          location={location}
          query={query}
          googleUrl={googleUrl}
          selectedCategories={selectedCategories}
          selectedWorkLocations={selectedWorkLocations}
          onKeywordsChange={setKeywords}
          onExclusionsChange={setExclusions}
          onDateChange={setDateRestrict}
          onStrategySelect={handleStrategySelect}
          onLocationChange={setLocation}
          onCategoriesChange={setSelectedCategories}
          onWorkLocationsChange={setSelectedWorkLocations}
          onSearch={handleSearch}
          onCopyQuery={handleCopyQuery}
        />

        {/* Results Area */}
        <ResultsContainer
          results={filteredResults}
          totalResults={filteredResults.length}
          currentPage={search.currentPage}
          isLoading={search.isLoading}
          error={search.error}
          hasSearched={hasSearched}
          googleUrl={googleUrl}
          isFavorite={favorites.isFavorite}
          onToggleFavorite={handleToggleFavorite}
          onPageChange={handlePageChange}
        />
      </main>

      {/* Modals & Overlays */}
      {toast && <Toast message={toast.message} isVisible={isVisible} />}
    </div>
  );
}
