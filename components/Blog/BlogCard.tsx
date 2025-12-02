import Link from 'next/link';
import { Calendar, Clock, Tag } from 'lucide-react';
import { BlogPost } from '@/lib/types';
import { formatDate } from '@/lib/blog';
import styles from './BlogCard.module.css';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className={styles.blogCard}>
      {post.image && (
        <div className={styles.imageContainer}>
          <img src={post.image} alt={post.title} className={styles.image} />
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
