import { Metadata } from 'next';
import Link from 'next/link';
import { Target, Heart, Users, Zap, Globe, Lock } from 'lucide-react';
import { pages, siteConfig, generateBreadcrumbSchema } from '@/lib/seo';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: pages.about.title,
  description: pages.about.description,
  openGraph: {
    title: pages.about.title,
    description: pages.about.description,
    url: `${siteConfig.url}${pages.about.path}`,
  },
};

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteConfig.url },
    { name: 'About', url: `${siteConfig.url}/about` },
  ]);

  return (
    <div className={styles.container}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className={styles.hero}>
        <h1 className={styles.title}>About JobRadar</h1>
        <p className={styles.subtitle}>
          Helping job seekers discover hidden remote opportunities by searching where companies actually post jobs
        </p>
      </section>

      <section className={styles.mission}>
        <div className={styles.content}>
          <h2>Our Mission</h2>
          <p>
            Job boards like Indeed and LinkedIn are crowded. A single remote job posting can
            receive 500+ applications within 24 hours. By the time you see it, hundreds have
            already applied.
          </p>
          <p>
            <strong>JobRadar changes the game.</strong> We search directly on company ATS platforms
            (like Greenhouse, Lever, and Workable) where jobs are posted first - often days or
            weeks before they appear on traditional job boards.
          </p>
        </div>
      </section>

      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Why JobRadar?</h2>
        <div className={styles.featureGrid}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <Target />
            </div>
            <h3>Find Jobs Earlier</h3>
            <p>
              Discover opportunities 3-7 days before they hit major job boards. Be among the
              first applicants.
            </p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <Zap />
            </div>
            <h3>Search 50+ Platforms</h3>
            <p>
              One search queries Greenhouse, Lever, Workable, and 50+ other ATS platforms
              simultaneously.
            </p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <Globe />
            </div>
            <h3>Remote-First Focus</h3>
            <p>
              Specialized in finding remote and work-from-anywhere opportunities across all
              industries.
            </p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <Lock />
            </div>
            <h3>Privacy First</h3>
            <p>
              Your API credentials stay in your browser. We never store or transmit your data
              to our servers.
            </p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <Users />
            </div>
            <h3>100% Free</h3>
            <p>
              No subscriptions, no paywalls. Use Google's free tier (100 searches/day) or
              upgrade on your terms.
            </p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <Heart />
            </div>
            <h3>Open Source</h3>
            <p>
              Built in public. View our code, contribute improvements, or self-host your own
              version.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.story}>
        <div className={styles.content}>
          <h2>The Story</h2>
          <p>
            JobRadar was created by{' '}
            <a href={siteConfig.author.url} target="_blank" rel="noopener noreferrer">
              Jose Paulino
            </a>
            , a software engineer who experienced the frustration of job searching firsthand.
          </p>
          <p>
            After sending hundreds of applications through traditional job boards with minimal
            responses, Jose discovered that companies post jobs on their ATS platforms first.
            Using Google search operators, he started finding jobs days before they appeared on
            LinkedIn or Indeed - and started getting more interviews.
          </p>
          <p>
            JobRadar automates this strategy, making it accessible to everyone. What took Jose
            hours of manual searching now takes seconds.
          </p>
        </div>
      </section>

      <section className={styles.values}>
        <h2 className={styles.sectionTitle}>Our Values</h2>
        <div className={styles.valueList}>
          <div className={styles.value}>
            <h3>🎯 Job Seeker First</h3>
            <p>
              Every decision we make prioritizes helping job seekers, not recruiters or
              companies. You're our customer.
            </p>
          </div>

          <div className={styles.value}>
            <h3>🔒 Privacy & Security</h3>
            <p>
              We never collect, store, or sell your data. Your searches, credentials, and
              applications remain private.
            </p>
          </div>

          <div className={styles.value}>
            <h3>🚀 Transparency</h3>
            <p>
              Open source code, transparent about how we work, honest about limitations. No
              hidden fees or tricks.
            </p>
          </div>

          <div className={styles.value}>
            <h3>💡 Continuous Improvement</h3>
            <p>
              We constantly add new platforms, features, and improvements based on user
              feedback.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.stats}>
        <h2 className={styles.sectionTitle}>By the Numbers</h2>
        <div className={styles.statsGrid}>
          <div className={styles.stat}>
            <div className={styles.statNumber}>50+</div>
            <div className={styles.statLabel}>ATS Platforms Searched</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>100%</div>
            <div className={styles.statLabel}>Free & Open Source</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>6</div>
            <div className={styles.statLabel}>Search Strategies</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>∞</div>
            <div className={styles.statLabel}>Job Opportunities</div>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <h2>Ready to Find Your Next Role?</h2>
        <p>Start searching 50+ ATS platforms in seconds</p>
        <div className={styles.ctaButtons}>
          <Link href="/" className={styles.primaryButton}>
            Start Searching
          </Link>
          <Link href="/setup" className={styles.secondaryButton}>
            Setup Guide
          </Link>
        </div>
      </section>
    </div>
  );
}
