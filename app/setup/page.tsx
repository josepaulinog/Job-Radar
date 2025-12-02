import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import styles from './page.module.css';

export const metadata: Metadata = generatePageMetadata('setup');

export default function SetupPage() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <header className={styles.header}>
                    <h1>Setup Guide</h1>
                    <p className={styles.subtitle}>
                        Get your Google Custom Search API credentials in 3 simple steps
                    </p>
                </header>

                <div className={styles.steps}>
                    {/* Step 1 */}
                    <section className={styles.step}>
                        <div className={styles.stepHeader}>
                            <span className={styles.stepNumber}>1</span>
                            <h2>Create a Google Cloud Project</h2>
                        </div>
                        <div className={styles.stepContent}>
                            <ol>
                                <li>Go to <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer">Google Cloud Console</a></li>
                                <li>Click <strong>"Select a project"</strong> → <strong>"New Project"</strong></li>
                                <li>Enter a project name (e.g., "JobRadar")</li>
                                <li>Click <strong>"Create"</strong></li>
                            </ol>
                            <div className={styles.note}>
                                <strong>Note:</strong> You'll need a Google account. The free tier includes 100 searches per day.
                            </div>
                        </div>
                    </section>

                    {/* Step 2 */}
                    <section className={styles.step}>
                        <div className={styles.stepHeader}>
                            <span className={styles.stepNumber}>2</span>
                            <h2>Enable Custom Search API & Get API Key</h2>
                        </div>
                        <div className={styles.stepContent}>
                            <ol>
                                <li>In your project, go to <a href="https://console.cloud.google.com/apis/library" target="_blank" rel="noopener noreferrer">API Library</a></li>
                                <li>Search for <strong>"Custom Search API"</strong></li>
                                <li>Click on it and press <strong>"Enable"</strong></li>
                                <li>Go to <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer">Credentials</a></li>
                                <li>Click <strong>"Create Credentials"</strong> → <strong>"API key"</strong></li>
                                <li>Copy your API key (keep it safe!)</li>
                            </ol>
                            <div className={styles.warning}>
                                <strong>Security:</strong> Your API key is stored locally in your browser only. JobRadar never sends it to our servers.
                            </div>
                        </div>
                    </section>

                    {/* Step 3 */}
                    <section className={styles.step}>
                        <div className={styles.stepHeader}>
                            <span className={styles.stepNumber}>3</span>
                            <h2>Create a Custom Search Engine</h2>
                        </div>
                        <div className={styles.stepContent}>
                            <ol>
                                <li>Go to <a href="https://programmablesearchengine.google.com/" target="_blank" rel="noopener noreferrer">Programmable Search Engine</a></li>
                                <li>Click <strong>"Add"</strong> to create a new search engine</li>
                                <li>Under "Sites to search", enter: <code>*</code> (asterisk for all sites)</li>
                                <li>Give it a name (e.g., "Job Search")</li>
                                <li>Click <strong>"Create"</strong></li>
                                <li>In the overview page, copy your <strong>Search engine ID</strong> (CX ID)</li>
                            </ol>
                            <div className={styles.tip}>
                                <strong>Pro Tip:</strong> The asterisk (*) allows searching across all websites, which is essential for job board searches.
                            </div>
                        </div>
                    </section>
                </div>

                {/* Configuration Section */}
                <section className={styles.configure}>
                    <h2>Configure JobRadar</h2>
                    <p>
                        Once you have both credentials, enter them in the <strong>API Configuration</strong> section
                        on the <a href="/">main page</a>. They'll be saved in your browser's local storage.
                    </p>
                    <div className={styles.credentialList}>
                        <div className={styles.credential}>
                            <strong>API Key:</strong> Your Google Cloud API key
                        </div>
                        <div className={styles.credential}>
                            <strong>CX ID:</strong> Your Custom Search Engine ID
                        </div>
                    </div>
                </section>

                {/* Troubleshooting */}
                <section className={styles.troubleshooting}>
                    <h2>Troubleshooting</h2>
                    <div className={styles.faq}>
                        <div className={styles.faqItem}>
                            <h3>Error: "API key not valid"</h3>
                            <p>Make sure you've enabled the Custom Search API in your Google Cloud project and that you're using the correct API key.</p>
                        </div>
                        <div className={styles.faqItem}>
                            <h3>No results appearing</h3>
                            <p>Verify that your Custom Search Engine is configured to search <code>*</code> (all sites) and that both credentials are entered correctly.</p>
                        </div>
                        <div className={styles.faqItem}>
                            <h3>Quota exceeded</h3>
                            <p>The free tier provides 100 searches/day. If you need more, you can upgrade to a paid plan in Google Cloud Console.</p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <div className={styles.cta}>
                    <a href="/" className={styles.ctaButton}>
                        Start Searching Jobs →
                    </a>
                </div>
            </div>
        </div>
    );
}
