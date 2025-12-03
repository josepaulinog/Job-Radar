import { Metadata } from 'next';
import Link from 'next/link';
import { Search, Newspaper } from 'lucide-react';
import { getAllPosts, getAllTags } from '@/lib/blog';
import { pages, siteConfig, generateBreadcrumbSchema } from '@/lib/seo';
import BlogGrid from '@/components/Blog/BlogGrid';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: pages.blog.title,
  description: pages.blog.description,
  openGraph: {
    title: pages.blog.title,
    description: pages.blog.description,
    url: `${siteConfig.url}${pages.blog.path}`,
    type: 'website',
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const tags = await getAllTags();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteConfig.url },
    { name: 'Blog', url: `${siteConfig.url}/blog` },
  ]);

  return (
    <div className={styles.container}>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroIcon}>
            <Newspaper size={40} />
          </div>
          <h1 className={styles.heroTitle}>Job<span style={{ color: 'var(--accent-primary)' }}>Radar</span> Blog</h1>
          <p className={styles.heroDescription}>
            Expert tips, strategies, and insights for remote job seekers. Learn how to find
            hidden opportunities, optimize your applications, and land your dream remote job.
          </p>

          {/* Tag Filter */}
          <div className={styles.tagFilter}>
            <span className={styles.filterLabel}>Popular Topics:</span>
            {tags.slice(0, 6).map((tag) => (
              <span key={tag} className={styles.filterTag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className={styles.posts}>
        <div className={styles.postsHeader}>
          <h2 className={styles.postsTitle}>Latest Articles</h2>
          <span className={styles.postsCount}>{posts.length} articles</span>
        </div>

        <BlogGrid posts={posts} />
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <Search size={48} className={styles.ctaIcon} />
          <h2 className={styles.ctaTitle}>Ready to Start Your Job Search?</h2>
          <p className={styles.ctaDescription}>
            Use JobRadar to search 50+ ATS platforms and discover hidden remote job
            opportunities before they hit the big job boards.
          </p>
          <Link href="/" className={styles.ctaButton}>
            Start Searching Jobs
          </Link>
        </div>
      </section>

      {/* Newsletter (Optional) */}
      <section className={styles.newsletter}>
        <h2 className={styles.newsletterTitle}>Stay Updated</h2>
        <p className={styles.newsletterDescription}>
          Get weekly job search tips and remote work insights delivered to your inbox
        </p>
        <div className={styles.newsletterForm}>
          <input
            type="email"
            placeholder="Enter your email"
            className={styles.newsletterInput}
          />
          <button className={styles.newsletterButton}>Subscribe</button>
        </div>
        <p className={styles.newsletterNote}>
          No spam. Unsubscribe anytime. Read our{' '}
          <Link href="/privacy">Privacy Policy</Link>
        </p>
      </section>
    </div>
  );
}
