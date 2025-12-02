'use client';

import { Radar, HelpCircle, Sun, Moon } from 'lucide-react';
import styles from './Header.module.css';

interface HeaderProps {
  apiConfigured: boolean;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenHelp: () => void;
}

export default function Header({ apiConfigured, theme, onToggleTheme, onOpenHelp }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <Radar size={22} />
          </div>
          <div className={styles.logoText}>
            Job<span>Radar</span>
          </div>
        </div>

        <div className={styles.headerActions}>
          <div className={`${styles.apiIndicator} ${apiConfigured ? styles.ready : ''}`}>
            <span className={styles.dot} />
            <span>{apiConfigured ? 'API Ready' : 'API Not Configured'}</span>
          </div>

          <button
            className={styles.themeToggle}
            onClick={onToggleTheme}
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className={styles.helpBtn}
            onClick={onOpenHelp}
            title="Help"
            aria-label="Help"
          >
            <HelpCircle size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
