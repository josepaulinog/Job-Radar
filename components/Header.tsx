'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Radar, HelpCircle, Sun, Moon, Menu, X } from 'lucide-react';
import styles from './Header.module.css';

interface HeaderProps {
  apiConfigured: boolean;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenHelp: () => void;
}

export default function Header({ apiConfigured, theme, onToggleTheme, onOpenHelp }: HeaderProps) {
  // Prevent hydration mismatch by only showing dynamic content after mount
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <Radar size={22} />
          </div>
          <div className={styles.logoText}>
            Job<span>Radar</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          <Link href="/blog" className={styles.navLink}>Blog</Link>
          <Link href="/about" className={styles.navLink}>About</Link>
          <Link href="/setup" className={styles.navLink}>Setup</Link>
          <Link href="/how-it-works" className={styles.navLink}>How It Works</Link>
        </nav>


        <div className={styles.headerActions}>
          <div className={`${styles.apiIndicator} ${mounted && apiConfigured ? styles.ready : ''}`}>
            <span className={styles.dot} />
            <span>{mounted ? (apiConfigured ? 'API Ready' : 'API Not Configured') : 'API Not Configured'}</span>
          </div>

          <button
            className={styles.themeToggle}
            onClick={onToggleTheme}
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            {mounted ? (theme === 'light' ? <Sun size={18} /> : <Moon size={18} />) : <Sun size={18} />}
          </button>

          <button
            className={styles.helpBtn}
            onClick={onOpenHelp}
            title="Help"
            aria-label="Help"
          >
            <HelpCircle size={18} />
          </button>

          <button
            className={styles.mobileMenuBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className={styles.mobileNav}>
          <Link href="/blog" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
            Blog
          </Link>
          <Link href="/about" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
            About
          </Link>
          <Link href="/setup" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
            Setup
          </Link>
          <Link href="/how-it-works" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
            How It Works
          </Link>
        </nav>
      )}
    </header>
  );
}
