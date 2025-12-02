import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { getPostBySlug, getAllPostSlugs, getRelatedPosts, formatDate } from '@/lib/blog';
import { generateArticleSchema, generateBreadcrumbSchema, siteConfig } from '@/lib/seo';
import BlogCard from '@/components/Blog/BlogCard';
import styles from './page.module.css';
import 'highlight.js/styles/github-dark.css';

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for each post
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  return {
    title: `${post.title} — JobRadar Blog`,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: post.image ? [post.image] : [siteConfig.ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [siteConfig.ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);
  const relatedPosts = await getRelatedPosts(params.slug, 3);

  // Generate structured data
  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.description,
    datePublished: post.date,
    author: post.author,
    image: post.image,
    url: `${siteConfig.url}/blog/${params.slug}`,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteConfig.url },
    { name: 'Blog', url: `${siteConfig.url}/blog` },
    { name: post.title, url: `${siteConfig.url}/blog/${params.slug}` },
  ]);

  return (
    <div className={styles.container}>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className={styles.article}>
        {/* Back Link */}
        <Link href="/blog" className={styles.backLink}>
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className={styles.header}>
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>

          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.description}>{post.description}</p>

          <div className={styles.meta}>
            <span className={styles.metaItem}>
              <User size={16} />
              {post.author}
            </span>
            <span className={styles.metaItem}>
              <Calendar size={16} />
              {formatDate(post.date)}
            </span>
            <span className={styles.metaItem}>
              <Clock size={16} />
              {post.readTime}
            </span>
          </div>
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className={styles.featuredImage}>
            <img src={post.image} alt={post.title} />
          </div>
        )}

        {/* Article Content */}
        <div className={styles.content}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              h1: ({ children }) => <h1 className={styles.h1}>{children}</h1>,
              h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
              h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
              p: ({ children }) => <p className={styles.paragraph}>{children}</p>,
              ul: ({ children }) => <ul className={styles.ul}>{children}</ul>,
              ol: ({ children }) => <ol className={styles.ol}>{children}</ol>,
              li: ({ children }) => <li className={styles.li}>{children}</li>,
              a: ({ href, children }) => (
                <a href={href} className={styles.link} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
              code: ({ className, children }) => {
                const isInline = !className;
                return isInline ? (
                  <code className={styles.inlineCode}>{children}</code>
                ) : (
                  <code className={className}>{children}</code>
                );
              },
              blockquote: ({ children }) => (
                <blockquote className={styles.blockquote}>{children}</blockquote>
              ),
              table: ({ children }) => (
                <div className={styles.tableWrapper}>
                  <table className={styles.table}>{children}</table>
                </div>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Article Footer */}
        <footer className={styles.footer}>
          <div className={styles.share}>
            <h3>Share this article</h3>
            <div className={styles.shareButtons}>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${siteConfig.url}/blog/${params.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareButton}
              >
                Share on Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${siteConfig.url}/blog/${params.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shareButton}
              >
                Share on LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className={styles.related}>
          <h2 className={styles.relatedTitle}>Related Articles</h2>
          <div className={styles.relatedGrid}>
            {relatedPosts.map((relatedPost) => (
              <BlogCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className={styles.cta}>
        <h2>Ready to Find Your Next Remote Job?</h2>
        <p>Search 50+ ATS platforms and job boards in seconds with JobRadar</p>
        <Link href="/" className={styles.ctaButton}>
          Start Searching Jobs
        </Link>
      </section>
    </div>
  );
}
