import { StrategyType, DateRestrict } from '@/lib/types';
import SearchFilters from './Sidebar/SearchFilters';
import SearchStrategies from './Sidebar/SearchStrategies';
import LocationFilter from './Sidebar/LocationFilter';
import QueryPreview from './Sidebar/QueryPreview';
import styles from './SearchContainer.module.css';

interface SearchContainerProps {
  keywords: string;
  exclusions: string;
  dateRestrict: DateRestrict;
  strategy: StrategyType;
  location: string;
  query: string;
  googleUrl: string;
  onKeywordsChange: (value: string) => void;
  onExclusionsChange: (value: string) => void;
  onDateChange: (value: DateRestrict) => void;
  onStrategySelect: (strategy: StrategyType) => void;
  onLocationChange: (value: string) => void;
  onSearch: () => void;
  onCopyQuery: () => void;
}

/**
 * Search container component that manages all search filters and controls
 * Extracted from main page for better organization and testability
 */
export default function SearchContainer({
  keywords,
  exclusions,
  dateRestrict,
  strategy,
  location,
  query,
  googleUrl,
  onKeywordsChange,
  onExclusionsChange,
  onDateChange,
  onStrategySelect,
  onLocationChange,
  onSearch,
  onCopyQuery,
}: SearchContainerProps) {
  return (
    <aside className={styles.sidebar}>
      <SearchFilters
        keywords={keywords}
        exclusions={exclusions}
        dateRestrict={dateRestrict}
        onKeywordsChange={onKeywordsChange}
        onExclusionsChange={onExclusionsChange}
        onDateChange={onDateChange}
        onSearch={onSearch}
      />

      <LocationFilter
        selectedLocation={location}
        onLocationChange={onLocationChange}
      />

      <SearchStrategies
        selectedStrategy={strategy}
        onSelectStrategy={onStrategySelect}
      />

      <QueryPreview
        query={query}
        googleUrl={googleUrl}
        onCopy={onCopyQuery}
      />
    </aside>
  );
}
