'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { calculateTotalPages, formatNumber } from '@/lib/utils';
import styles from './ResultsHeader.module.css';

interface ResultsHeaderProps {
  totalResults: number;
  currentPage: number;
  hasResults: boolean;
  onPageChange: (delta: number) => void;
}

export default function ResultsHeader({
  totalResults,
  currentPage,
  hasResults,
  onPageChange
}: ResultsHeaderProps) {
  const totalPages = calculateTotalPages(totalResults);
  const showPagination = hasResults && totalResults > 0;

  return (
    <div className={styles.resultsHeader}>
      <h1 className={styles.resultsTitle}>Search Results</h1>

      {showPagination && (
        <div className={styles.resultsMeta}>
          <span className={styles.resultsCount}>
            {formatNumber(totalResults)} results
          </span>
          <div className={styles.pagination}>
            <button
              className={styles.pageBtn}
              onClick={() => onPageChange(-1)}
              disabled={currentPage <= 1}
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>
            <span className={styles.pageInfo}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={styles.pageBtn}
              onClick={() => onPageChange(1)}
              disabled={currentPage >= totalPages}
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
