'use client';

import { Filter, Search } from 'lucide-react';
import { DateRestrict } from '@/lib/types';
import styles from './SearchFilters.module.css';

interface SearchFiltersProps {
  keywords: string;
  exclusions: string;
  dateRestrict: DateRestrict;
  onKeywordsChange: (value: string) => void;
  onExclusionsChange: (value: string) => void;
  onDateChange: (value: DateRestrict) => void;
  onSearch: () => void;
}

const dateOptions: { label: string; value: DateRestrict }[] = [
  { label: 'Any', value: '' },
  { label: 'Month', value: 'm1' },
  { label: 'Week', value: 'w1' },
  { label: '24h', value: 'd1' }
];

export default function SearchFilters({
  keywords,
  exclusions,
  dateRestrict,
  onKeywordsChange,
  onExclusionsChange,
  onDateChange,
  onSearch
}: SearchFiltersProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>
          <Filter size={14} />
          Search Filters
        </div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.searchField}>
          <label className={styles.fieldLabel}>Job Title / Keywords</label>
          <input
            type="text"
            className={styles.searchInput}
            value={keywords}
            onChange={(e) => onKeywordsChange(e.target.value)}
            placeholder="e.g. React Developer, UX Designer"
          />
        </div>

        <div className={styles.searchField}>
          <label className={styles.fieldLabel}>Exclude Terms</label>
          <input
            type="text"
            className={styles.searchInput}
            value={exclusions}
            onChange={(e) => onExclusionsChange(e.target.value)}
            placeholder="e.g. senior, lead, unpaid"
          />
        </div>

        <div className={styles.searchField}>
          <label className={styles.fieldLabel}>Posted Within</label>
          <div className={styles.dateSelector}>
            {dateOptions.map((option) => (
              <button
                key={option.value || 'any'}
                className={`${styles.datePill} ${dateRestrict === option.value ? styles.active : ''}`}
                onClick={() => onDateChange(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <button className={styles.searchBtn} onClick={onSearch}>
          <Search size={16} />
          Run Search
        </button>
      </div>
    </div>
  );
}
