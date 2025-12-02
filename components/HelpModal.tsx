'use client';

import { X } from 'lucide-react';
import styles from './HelpModal.module.css';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  if (!isOpen) return null;

  return (
    <div className={`${styles.modalOverlay} ${isOpen ? styles.open : ''}`} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>How JobRadar Works</h3>
          <button className={styles.modalClose} onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.helpSection}>
            <div className={styles.helpLabel}>About</div>
            <div className={styles.helpText}>
              <strong>JobRadar</strong> is a free, open-source tool that helps you find hidden remote job
              opportunities by searching directly on company ATS platforms.
              <br /><br />
              Built by{' '}
              <a href="https://josepaulino.com" target="_blank" rel="noopener noreferrer">
                Jose Paulino
              </a>
            </div>
          </div>

          <div className={styles.helpSection}>
            <div className={styles.helpLabel}>Setup Requirements</div>
            <div className={styles.helpText}>
              You need two things from Google:
              <br /><br />
              <strong>1. API Key:</strong> Get one from the{' '}
              <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer">
                Google Cloud Console
              </a>
              . Enable the &quot;Custom Search API&quot;.
              <br /><br />
              <strong>2. Search Engine ID (CX):</strong> Create a Programmable Search Engine at{' '}
              <a href="https://programmablesearchengine.google.com/controlpanel/all" target="_blank" rel="noopener noreferrer">
                Google PSE
              </a>
              . Select &quot;Search the entire web&quot; option.
            </div>
          </div>

          <div className={styles.helpSection}>
            <div className={styles.helpLabel}>How It Works</div>
            <div className={styles.helpText}>
              JobRadar uses advanced Google search operators (&quot;dorks&quot;) to find jobs directly on company ATS
              platforms like Greenhouse, Lever, and Workable — bypassing crowded job boards.
            </div>
          </div>

          <div className={styles.helpSection}>
            <div className={styles.helpLabel}>Usage Limits</div>
            <div className={styles.helpText}>
              Google provides <strong>100 free searches/day</strong>. Additional queries cost $5 per 1,000.
              Each strategy click = 1 API call returning up to 10 results.
            </div>
          </div>

          <div className={styles.helpSection}>
            <div className={styles.helpLabel}>Privacy</div>
            <div className={styles.helpText}>
              Your API credentials are stored only in your browser&apos;s localStorage. Nothing is sent to any
              server except Google&apos;s official API.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
