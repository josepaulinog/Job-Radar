import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerGrid}>
          {/* Product */}
          <div className={styles.footerSection}>
            <h4>Product</h4>
            <ul>
              <li><Link href="/">Job Search</Link></li>
              <li><Link href="/how-it-works">How It Works</Link></li>
              <li><Link href="/setup">Setup Guide</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className={styles.footerSection}>
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><a href="https://github.com/josepaulino/job-radar" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className={styles.footerSection}>
            <h4>Resources</h4>
            <ul>
              <li><a href="https://developers.google.com/custom-search" target="_blank" rel="noopener noreferrer">Google API Docs</a></li>
              <li><Link href="/blog">Job Search Tips</Link></li>
              <li><a href="https://github.com/josepaulino/job-radar#readme" target="_blank" rel="noopener noreferrer">Documentation</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className={styles.footerSection}>
            <h4>Legal</h4>
            <ul>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.footerBottom}>
          <div className={styles.footerCopyright}>
            <span>© {currentYear} JobRadar.</span>
            <span>Built by <a href="https://josepaulino.com" target="_blank" rel="noopener noreferrer">Jose Paulino</a></span>
            <span>Open Source • MIT License</span>
          </div>
          <div className={styles.footerSocial}>
            <a href="https://github.com/josepaulino" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="https://twitter.com/josepaulinog" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="https://linkedin.com/in/josepaulino" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
