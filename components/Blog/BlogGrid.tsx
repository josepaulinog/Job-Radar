import { BlogPost } from '@/lib/types';
import BlogCard from './BlogCard';
import styles from './BlogGrid.module.css';

interface BlogGridProps {
  posts: BlogPost[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  return (
    <div className={styles.postsGrid}>
      {posts.map((post, index) => (
        <BlogCard key={post.slug} post={post} index={index} />
      ))}
    </div>
  );
}
