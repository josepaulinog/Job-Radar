import { Radar, SearchX } from 'lucide-react';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  variant?: 'initial' | 'no-results';
}

export default function EmptyState({ variant = 'initial' }: EmptyStateProps) {
  const isInitial = variant === 'initial';

  return (
    <div className={styles.emptyState}>
      <div className={styles.illustration}>
        {isInitial ? (
          <div className={styles.radarPulse}>
            <Radar size={48} />
            <div className={styles.pulseRing} />
            <div className={styles.pulseRing} style={{ animationDelay: '0.5s' }} />
          </div>
        ) : (
          <div className={styles.searchVoid}>
            <SearchX size={48} />
            <div className={styles.voidRing} />
          </div>
        )}
      </div>

      <h2 className={styles.emptyTitle}>
        {isInitial ? 'Ready to Scan' : 'No Signals Detected'}
      </h2>

      <p className={styles.emptyDesc}>
        {isInitial
          ? 'Configure your API credentials and select a strategy to start scanning for hidden opportunities.'
          : 'We scanned the frequencies but found nothing. Try adjusting your keywords or switching search strategies.'}
      </p>

      {!isInitial && (
        <div className={styles.suggestions}>
          <span>Try:</span>
          <span className={styles.suggestion}>"Remote"</span>
          <span className={styles.suggestion}>"Hiring"</span>
          <span className={styles.suggestion}>"Apply"</span>
        </div>
      )}
    </div>
  );
}
