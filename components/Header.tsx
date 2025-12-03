'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Radar, Heart, Sun, Moon, Menu, X } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import ApiConfigMenu from './ApiConfigMenu';
import styles from './Header.module.css';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function Header({ theme, onToggleTheme }: HeaderProps) {
  // Prevent hydration mismatch by only showing dynamic content after mount
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const favorites = useFavorites();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path: string) => pathname === path;

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
          <Link
            href="/blog"
            className={`${styles.navLink} ${isActive('/blog') ? styles.active : ''}`}
          >
            Blog
          </Link>
          <Link
            href="/about"
            className={`${styles.navLink} ${isActive('/about') ? styles.active : ''}`}
          >
            About
          </Link>
          <Link
            href="/setup"
            className={`${styles.navLink} ${isActive('/setup') ? styles.active : ''}`}
          >
            Setup
          </Link>
          <Link
            href="/how-it-works"
            className={`${styles.navLink} ${isActive('/how-it-works') ? styles.active : ''}`}
          >
            How It Works
          </Link>
        </nav>


        <div className={styles.headerActions}>
          {mounted && <ApiConfigMenu />}

          <button
            className={styles.themeToggle}
            onClick={onToggleTheme}
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            {mounted ? (theme === 'light' ? <Sun size={18} /> : <Moon size={18} />) : <Sun size={18} />}
          </button>

          <Link
            href="/favorites"
            className={`${styles.favoritesLink} ${isActive('/favorites') ? styles.active : ''}`}
            title="Favorites"
            aria-label="Favorites"
          >
            <Heart size={18} />
            {mounted && favorites.count > 0 && (
              <span className={styles.favoritesCount}>{favorites.count}</span>
            )}
          </Link>

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
          <Link
            href="/favorites"
            className={`${styles.mobileNavLink} ${isActive('/favorites') ? styles.active : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Favorites
          </Link>
          <Link
            href="/blog"
            className={`${styles.mobileNavLink} ${isActive('/blog') ? styles.active : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            href="/about"
            className={`${styles.mobileNavLink} ${isActive('/about') ? styles.active : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/setup"
            className={`${styles.mobileNavLink} ${isActive('/setup') ? styles.active : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Setup
          </Link>
          <Link
            href="/how-it-works"
            className={`${styles.mobileNavLink} ${isActive('/how-it-works') ? styles.active : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            How It Works
          </Link>

          <button
            className={styles.mobileThemeBtn}
            onClick={() => {
              onToggleTheme();
              setMobileMenuOpen(false);
            }}
          >
            {mounted ? (theme === 'light' ? <Sun size={18} /> : <Moon size={18} />) : <Sun size={18} />}
            {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          </button>
        </nav>
      )}
    </header>
  );
}
