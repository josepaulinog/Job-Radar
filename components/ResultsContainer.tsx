import { GoogleSearchItem, SearchError } from '@/lib/types';
import ResultsHeader from './Results/ResultsHeader';
import JobCard from './Results/JobCard';
import EmptyState from './Results/EmptyState';
import LoadingState from './Results/LoadingState';
import ErrorState from './Results/ErrorState';
import styles from './ResultsContainer.module.css';

interface ResultsContainerProps {
  results: GoogleSearchItem[];
  totalResults: number;
  currentPage: number;
  isLoading: boolean;
  error: SearchError | null;
  hasSearched: boolean;
  googleUrl: string;
  isFavorite: (link: string) => boolean;
  onToggleFavorite: (job: GoogleSearchItem) => void;
  onPageChange: (delta: number) => void;
}

/**
 * Results container component that displays search results
 * Extracted from main page for better organization and testability
 */
export default function ResultsContainer({
  results,
  totalResults,
  currentPage,
  isLoading,
  error,
  hasSearched,
  googleUrl,
  isFavorite,
  onToggleFavorite,
  onPageChange,
}: ResultsContainerProps) {
  return (
    <section className={styles.resultsArea}>
      <ResultsHeader
        totalResults={totalResults}
        currentPage={currentPage}
        hasResults={results.length > 0}
        onPageChange={onPageChange}
      />

      <div className={styles.resultsContainer}>
        {/* Loading State */}
        {isLoading && <LoadingState />}

        {/* Error State */}
        {!isLoading && error && (
          <ErrorState error={error} />
        )}

        {/* Initial Empty State */}
        {!isLoading && !error && !hasSearched && (
          <EmptyState variant="initial" />
        )}

        {/* No Results State */}
        {!isLoading && !error && hasSearched && results.length === 0 && (
          <EmptyState variant="no-results" googleSearchUrl={googleUrl} />
        )}

        {/* Results */}
        {!isLoading && !error && results.length > 0 && (
          <>
            {results.map((job, index) => (
              <JobCard
                key={`${job.link}-${index}`}
                job={job}
                index={index}
                isFavorite={isFavorite(job.link)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
