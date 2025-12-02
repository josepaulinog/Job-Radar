import { Radar, SearchX } from 'lucide-react';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  variant?: 'initial' | 'no-results';
}

export default function EmptyState({ variant = 'initial' }: EmptyStateProps) {
  const isInitial = variant === 'initial';

  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>
        {isInitial ? <Radar size={36} /> : <SearchX size={36} />}
      </div>
      <h2 className={styles.emptyTitle}>
        {isInitial ? 'Ready to Scan' : 'No Results Found'}
      </h2>
      <p className={styles.emptyDesc}>
        {isInitial
          ? 'Configure your API credentials and click a search strategy to start finding hidden job opportunities.'
          : 'Try adjusting your keywords or selecting a different search strategy.'}
      </p>
    </div>
  );
}
