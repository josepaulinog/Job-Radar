'use client';

import { useState, useRef, useEffect } from 'react';
import { Filter, Search } from 'lucide-react';
import { DateRestrict } from '@/lib/types';
import { filterJobTitles } from '@/lib/job-titles';
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
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Update suggestions when keywords change
  useEffect(() => {
    const filtered = filterJobTitles(keywords, 8);
    setSuggestions(filtered);
    setActiveSuggestionIndex(-1);
  }, [keywords]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Enter') {
        onSearch();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveSuggestionIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveSuggestionIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (activeSuggestionIndex >= 0) {
          onKeywordsChange(suggestions[activeSuggestionIndex]);
          setShowSuggestions(false);
        } else {
          onSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onKeywordsChange(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

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
          <div style={{ position: 'relative' }}>
            <input
              ref={inputRef}
              type="text"
              className={styles.searchInput}
              value={keywords}
              onChange={(e) => onKeywordsChange(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. React Developer, UX Designer"
              autoComplete="off"
            />
            {showSuggestions && suggestions.length > 0 && (
              <div ref={suggestionsRef} className={styles.autocomplete}>
                {suggestions.map((suggestion, index) => (
                  <div
                    key={suggestion}
                    className={`${styles.suggestion} ${
                      index === activeSuggestionIndex ? styles.active : ''
                    }`}
                    onClick={() => handleSuggestionClick(suggestion)}
                    onMouseEnter={() => setActiveSuggestionIndex(index)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
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
