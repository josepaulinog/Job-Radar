'use client';

import { useState, useEffect, useRef } from 'react';
import { Heading } from '@/lib/blog-client';
import { List } from 'lucide-react';
import { gsap } from '@/lib/animations';
import styles from './TableOfContents.module.css';

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const linksRef = useRef<Map<string, HTMLAnchorElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
      }
    );

    // Observe all headings
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  // Animate active link change
  useEffect(() => {
    if (activeId) {
      const activeLink = linksRef.current.get(activeId);
      if (activeLink) {
        gsap.fromTo(
          activeLink,
          { x: -5, opacity: 0.7 },
          { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
        );
      }
    }
  }, [activeId]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className={styles.toc}>
      <div className={styles.tocHeader}>
        <List size={18} />
        <h4 className={styles.tocTitle}>Table of Contents</h4>
      </div>

      <ul className={styles.tocList}>
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={styles.tocItem}
            style={{
              paddingLeft: `${(heading.level - 1) * 0.75}rem`,
            }}
          >
            <a
              ref={(el) => {
                if (el) linksRef.current.set(heading.id, el);
              }}
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={`${styles.tocLink} ${activeId === heading.id ? styles.active : ''}`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
