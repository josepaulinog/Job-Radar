import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span>
          Built by{' '}
          <a href="https://josepaulino.com" target="_blank" rel="noopener noreferrer">
            Jose Paulino
          </a>
        </span>
        <span className={styles.footerDot}>•</span>
        <span>Open Source</span>
      </div>
    </footer>
  );
}
