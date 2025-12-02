'use client';

import { useState, useEffect } from 'react';
import { StrategyType, DateRestrict } from '@/lib/types';
import { getStrategyQuery, getGoogleSearchUrl } from '@/lib/enhanced-strategies';
import { useLocalStorage, useTheme } from '@/hooks/useLocalStorage';
import { useSearch } from '@/hooks/useSearch';
import { useToast } from '@/hooks/useToast';
import { useFavorites } from '@/hooks/useFavorites';

// Components
import Toast from '@/components/Toast';
import SearchFilters from '@/components/Sidebar/SearchFilters';
import SearchStrategies from '@/components/Sidebar/SearchStrategies';
import LocationFilter from '@/components/Sidebar/LocationFilter';
import QueryPreview from '@/components/Sidebar/QueryPreview';
import ResultsHeader from '@/components/Results/ResultsHeader';
import JobCard from '@/components/Results/JobCard';
import EmptyState from '@/components/Results/EmptyState';
import LoadingState from '@/components/Results/LoadingState';
import ErrorState from '@/components/Results/ErrorState';

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

  // UI state
  const [query, setQuery] = useState('');
  const [googleUrl, setGoogleUrl] = useState('');

  // Search hook
  const search = useSearch();

  // Favorites hook
  const favorites = useFavorites();

  // Toast hook
  const { toast, isVisible, showToast } = useToast();

  // Update query preview when inputs change
  useEffect(() => {
    const newQuery = getStrategyQuery(strategy, keywords, exclusions, location);
    setQuery(newQuery);
    setGoogleUrl(getGoogleSearchUrl(newQuery, dateRestrict));
  }, [keywords, exclusions, strategy, dateRestrict, location]);



  // Handle strategy selection (triggers search)
  const handleStrategySelect = async (newStrategy: StrategyType) => {
    setStrategy(newStrategy);

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
      });
    }
  };

  const apiConfigured = !!(apiKey && cxId);
  const hasSearched = search.results.length > 0 || search.error !== null;

  return (
    <div className={styles.container}>

      <main className={styles.main}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <SearchFilters
            keywords={keywords}
            exclusions={exclusions}
            dateRestrict={dateRestrict}
            onKeywordsChange={setKeywords}
            onExclusionsChange={setExclusions}
            onDateChange={setDateRestrict}
            onSearch={handleSearch}
          />

          <LocationFilter
            selectedLocation={location}
            onLocationChange={setLocation}
          />

          <SearchStrategies
            selectedStrategy={strategy}
            onSelectStrategy={handleStrategySelect}
          />

          <QueryPreview
            query={query}
            googleUrl={googleUrl}
            onCopy={handleCopyQuery}
          />
        </aside>

        {/* Results Area */}
        <section className={styles.resultsArea}>
          <ResultsHeader
            totalResults={search.totalResults}
            currentPage={search.currentPage}
            hasResults={search.results.length > 0}
            onPageChange={handlePageChange}
          />

          <div className={styles.resultsContainer}>
            {/* Loading State */}
            {search.isLoading && <LoadingState />}

            {/* Error State */}
            {!search.isLoading && search.error && (
              <ErrorState error={search.error} />
            )}

            {/* Initial Empty State */}
            {!search.isLoading && !search.error && !hasSearched && (
              <EmptyState variant="initial" />
            )}

            {/* No Results State */}
            {!search.isLoading && !search.error && hasSearched && search.results.length === 0 && (
              <EmptyState variant="no-results" googleSearchUrl={googleUrl} />
            )}

            {/* Results */}
            {!search.isLoading && !search.error && search.results.length > 0 && (
              <>
                {search.results.map((job, index) => (
                  <JobCard
                    key={`${job.link}-${index}`}
                    job={job}
                    isFavorite={favorites.isFavorite(job.link)}
                    onToggleFavorite={favorites.toggleFavorite}
                  />
                ))}
              </>
            )}
          </div>
        </section>
      </main>

      {/* Modals & Overlays */}
      {toast && <Toast message={toast.message} isVisible={isVisible} />}
    </div>
  );
}
