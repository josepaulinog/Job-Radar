'use client';

import { Copy, ExternalLink } from 'lucide-react';
import styles from './QueryPreview.module.css';

interface QueryPreviewProps {
  query: string;
  googleUrl: string;
  onCopy: () => void;
}

export default function QueryPreview({ query, googleUrl, onCopy }: QueryPreviewProps) {
  return (
    <div className={styles.queryPreview}>
      <div className={styles.queryHeader}>
        <span className={styles.queryLabel}>Generated Query</span>
        <button className={styles.copyBtn} onClick={onCopy}>
          <Copy size={12} />
          Copy
        </button>
      </div>
      <div className={styles.queryBody}>
        <div className={styles.queryText}>{query}</div>
        <a
          href={googleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.googleLink}
        >
          Open in Google
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}
