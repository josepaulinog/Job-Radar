import type { Metadata } from 'next';
import { Target, Briefcase, FileText } from 'lucide-react';
import { generatePageMetadata } from '@/lib/seo';
import styles from './page.module.css';

export const metadata: Metadata = generatePageMetadata('howItWorks');

export default function HowItWorksPage() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <header className={styles.header}>
                    <h1>How It Works</h1>
                    <p className={styles.subtitle}>
                        Discover the technology behind JobRadar&apos;s powerful job search engine
                    </p>
                </header>

                {/* Overview */}
                <section className={styles.overview}>
                    <h2>The Power of Search Operators</h2>
                    <p>
                        JobRadar leverages advanced Google search operators combined with knowledge of
                        Applicant Tracking Systems (ATS) to find job postings that other job seekers miss.
                    </p>
                    <p>
                        Instead of relying on traditional job boards, we search directly on company career
                        pages and ATS platforms where jobs are <strong>first posted</strong> — giving you
                        a competitive advantage.
                    </p>
                </section>

                {/* How It Works Steps */}
                <section className={styles.howItWorks}>
                    <h2>The Process</h2>
                    <div className={styles.processSteps}>
                        <div className={styles.processStep}>
                            <div className={styles.processNumber}>1</div>
                            <div className={styles.processContent}>
                                <h3>You Choose a Strategy</h3>
                                <p>
                                    Select from 6 specialized search strategies: ATS X-Ray, Career Pages,
                                    Job Boards, Tech Giants, Communities, or Documents.
                                </p>
                            </div>
                        </div>

                        <div className={styles.processStep}>
                            <div className={styles.processNumber}>2</div>
                            <div className={styles.processContent}>
                                <h3>We Build the Query</h3>
                                <p>
                                    JobRadar constructs a sophisticated search query using operators like
                                    <code>site:</code>, <code>intitle:</code>, <code>inurl:</code>, and
                                    <code>OR</code> to target specific platforms.
                                </p>
                            </div>
                        </div>

                        <div className={styles.processStep}>
                            <div className={styles.processNumber}>3</div>
                            <div className={styles.processContent}>
                                <h3>Google Searches Precisely</h3>
                                <p>
                                    Using the Google Custom Search API, we execute the query across billions
                                    of web pages with pinpoint accuracy.
                                </p>
                            </div>
                        </div>

                        <div className={styles.processStep}>
                            <div className={styles.processNumber}>4</div>
                            <div className={styles.processContent}>
                                <h3>You Get Fresh Results</h3>
                                <p>
                                    Receive job postings directly from company career pages and ATS platforms,
                                    often before they appear on job aggregators.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Search Strategies */}
                <section className={styles.strategies}>
                    <h2>6 Specialized Search Strategies</h2>
                    <div className={styles.strategyGrid}>
                        <div className={styles.strategyCard}>
                            <div className={styles.strategyIcon}><Target size={28} /></div>
                            <h3>ATS X-Ray</h3>
                            <p>Search across 50+ Applicant Tracking Systems like Greenhouse, Lever, Workable, and more.</p>
                            <div className={styles.strategyStats}>50+ platforms</div>
                        </div>

                        <div className={styles.strategyCard}>
                            <div className={styles.strategyIcon}>🏢</div>
                            <h3>Career Pages</h3>
                            <p>Target company career pages directly, finding jobs at the source.</p>
                            <div className={styles.strategyStats}>Unlimited companies</div>
                        </div>

                        <div className={styles.strategyCard}>
                            <div className={styles.strategyIcon}>📋</div>
                            <h3>Job Boards</h3>
                            <p>Search 30+ remote job boards like WeWorkRemotely, Remote.co, and Remotive.</p>
                            <div className={styles.strategyStats}>30+ boards</div>
                        </div>

                        <div className={styles.strategyCard}>
                            <div className={styles.strategyIcon}><Briefcase size={28} /></div>
                            <h3>Tech Giants</h3>
                            <p>Search career pages of 25+ major tech companies: Google, Apple, Amazon, and more.</p>
                            <div className={styles.strategyStats}>25+ companies</div>
                        </div>

                        <div className={styles.strategyCard}>
                            <div className={styles.strategyIcon}>💬</div>
                            <h3>Communities</h3>
                            <p>Find job postings in communities like Reddit, Hacker News, and tech forums.</p>
                            <div className={styles.strategyStats}>Multiple sources</div>
                        </div>

                        <div className={styles.strategyCard}>
                            <div className={styles.strategyIcon}><FileText size={28} /></div>
                            <h3>Documents</h3>
                            <p>Discover job specs and hiring documents in PDFs and other file formats.</p>
                            <div className={styles.strategyStats}>All file types</div>
                        </div>
                    </div>
                </section>

                {/* Technology Stack */}
                <section className={styles.technology}>
                    <h2>Built With Modern Technology</h2>
                    <div className={styles.techStack}>
                        <div className={styles.techItem}>
                            <h3>Google Custom Search API</h3>
                            <p>Harness the power of Google&apos;s search infrastructure with precision and control.</p>
                        </div>
                        <div className={styles.techItem}>
                            <h3>Advanced Search Operators</h3>
                            <p>Combine multiple operators to create highly targeted search queries.</p>
                        </div>
                        <div className={styles.techItem}>
                            <h3>Real-Time Results</h3>
                            <p>Get up-to-date job listings as soon as they&apos;re posted online.</p>
                        </div>
                        <div className={styles.techItem}>
                            <h3>Privacy First</h3>
                            <p>Your API credentials are stored locally in your browser — we never see them.</p>
                        </div>
                    </div>
                </section>

                {/* Why It Works */}
                <section className={styles.whyItWorks}>
                    <h2>Why This Works Better</h2>
                    <div className={styles.comparison}>
                        <div className={styles.comparisonColumn}>
                            <h3 className={styles.comparisonTitle}>Traditional Job Boards</h3>
                            <ul className={styles.comparisonList}>
                                <li className={styles.negative}>Jobs posted days/weeks later</li>
                                <li className={styles.negative}>High competition (1000+ applicants)</li>
                                <li className={styles.negative}>Limited to board&apos;s partnerships</li>
                                <li className={styles.negative}>Generic search filters</li>
                            </ul>
                        </div>
                        <div className={styles.comparisonColumn}>
                            <h3 className={styles.comparisonTitle}>Job<span style={{ color: 'var(--accent-primary)' }}>Radar</span></h3>
                            <ul className={styles.comparisonList}>
                                <li className={styles.positive}>Find jobs at the source</li>
                                <li className={styles.positive}>Be among the first applicants</li>
                                <li className={styles.positive}>Search any company directly</li>
                                <li className={styles.positive}>Precision-targeted searches</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className={styles.faqs}>
                    <h2>Frequently Asked Questions</h2>
                    <div className={styles.faqList}>
                        <div className={styles.faqItem}>
                            <h3>Is JobRadar free to use?</h3>
                            <p>Yes! You just need your own Google API credentials (free tier: 100 searches/day).</p>
                        </div>
                        <div className={styles.faqItem}>
                            <h3>Do I need programming knowledge?</h3>
                            <p>Not at all. Simply enter your API credentials and start searching — no coding required.</p>
                        </div>
                        <div className={styles.faqItem}>
                            <h3>How is this different from Google Jobs?</h3>
                            <p>We use advanced search operators to target specific ATS platforms and career pages,
                                giving you more control and finding jobs that might not appear in Google Jobs.</p>
                        </div>
                        <div className={styles.faqItem}>
                            <h3>Can I search for remote-only jobs?</h3>
                            <p>Absolutely! Use the location filter and include keywords like &quot;remote&quot;, &quot;work from home&quot;,
                                or use the Job Boards strategy which focuses on remote positions.</p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <div className={styles.cta}>
                    <h2>Ready to Find Your Next Job?</h2>
                    <p>Get started in 3 simple steps</p>
                    <div className={styles.ctaButtons}>
                        <a href="/setup" className={styles.ctaButtonPrimary}>
                            Setup Guide →
                        </a>
                        <a href="/" className={styles.ctaButtonSecondary}>
                            Start Searching →
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
