'use client';

import { useRef, useEffect } from 'react';
import { BlogPost } from '@/lib/blog';
import BlogCard from './BlogCard';
import { staggerChildren } from '@/lib/gsap-animations';
import styles from './BlogGrid.module.css';

interface BlogGridProps {
  posts: BlogPost[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      staggerChildren(gridRef.current, '.blog-card-item', {
        duration: 0.6,
        stagger: 0.1,
        y: 40,
      });
    }
  }, [posts]);

  return (
    <div ref={gridRef} className={styles.postsGrid}>
      {posts.map((post) => (
        <div key={post.slug} className="blog-card-item">
          <BlogCard post={post} />
        </div>
      ))}
    </div>
  );
}
