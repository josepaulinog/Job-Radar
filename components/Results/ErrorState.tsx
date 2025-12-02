import { AlertCircle } from 'lucide-react';
import { SearchError } from '@/lib/types';
import styles from './ErrorState.module.css';

interface ErrorStateProps {
  error: SearchError;
}

export default function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className={styles.errorState}>
      <div className={styles.errorIcon}>
        <AlertCircle size={24} />
      </div>
      <div className={styles.errorTitle}>{error.error}</div>
      <div className={styles.errorMessage}>{error.message}</div>
      {error.details && (
        <div className={styles.errorHelp}>{error.details}</div>
      )}
    </div>
  );
}
