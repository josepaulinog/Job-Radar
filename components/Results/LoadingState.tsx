import styles from './LoadingState.module.css';

export default function LoadingState() {
  return (
    <div className={styles.loadingState}>
      <div className={styles.radarContainer}>
        <div className={styles.radar}>
          <div className={styles.radarGrid} />
          <div className={styles.radarDot} />
          <div className={styles.radarDot} />
          <div className={styles.radarDot} />
        </div>
      </div>
      <div className={styles.loadingText}>Scanning the web...</div>
      <div className={styles.loadingSub}>Querying Google Custom Search API</div>
    </div>
  );
}
