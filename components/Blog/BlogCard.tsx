'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Tag } from 'lucide-react';
import { BlogPost } from '@/lib/types';
import { formatDate } from '@/lib/blog-client';
import { gsap } from '@/lib/animations';
import styles from './BlogCard.module.css';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.12,
          ease: 'power2.out',
        }
      );
    }
  }, [index]);

  const handleMouseEnter = () => {
    if (imageRef.current) {
      const img = imageRef.current.querySelector('img');
      if (img) {
        gsap.to(img, { scale: 1.1, duration: 0.4, ease: 'power2.out' });
      }
    }
  };

  const handleMouseLeave = () => {
    if (imageRef.current) {
      const img = imageRef.current.querySelector('img');
      if (img) {
        gsap.to(img, { scale: 1, duration: 0.4, ease: 'power2.out' });
      }
    }
  };

  return (
    <article
      ref={cardRef}
      className={styles.blogCard}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {post.image && (
        <div ref={imageRef} className={styles.imageContainer}>
          <Link href={`/blog/${post.slug}`} className={styles.imageLink}>
            <Image
              src={post.image}
              alt={post.title}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Link>
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <Calendar size={14} />
            {formatDate(post.date)}
          </span>
          <span className={styles.metaItem}>
            <Clock size={14} />
            {post.readTime}
          </span>
        </div>

        <h2 className={styles.title}>
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h2>

        <p className={styles.description}>{post.description}</p>

        <div className={styles.footer}>
          <div className={styles.tags}>
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className={styles.tag}>
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>

          <Link href={`/blog/${post.slug}`} className={styles.readMore}>
            Read Article →
          </Link>
        </div>
      </div>
    </article>
  );
}
