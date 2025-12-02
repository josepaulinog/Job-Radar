import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import styles from './page.module.css';

export const metadata: Metadata = generatePageMetadata('privacy');

export default function PrivacyPage() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1>Privacy Policy</h1>
                <p className={styles.lastUpdated}>Last Updated: December 1, 2024</p>

                <section className={styles.section}>
                    <h2>Introduction</h2>
                    <p>
                        Welcome to JobRadar. We respect your privacy and are committed to protecting
                        your personal information. This Privacy Policy explains how we collect, use,
                        and safeguard your data when you use our service.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Information We Collect</h2>
                    <h3>Information You Provide</h3>
                    <ul>
                        <li><strong>API Credentials:</strong> Your Google Custom Search API key and CX ID are stored locally in your browser&apos;s localStorage only.</li>
                        <li><strong>Search Queries:</strong> Your job search keywords and preferences are processed locally.</li>
                    </ul>
                    <h3>Automatically Collected Information</h3>
                    <ul>
                        <li><strong>Usage Data:</strong> We may collect anonymous analytics data about how you use JobRadar (page views, feature usage).</li>
                        <li><strong>Technical Data:</strong> Browser type, device information, and IP address for security and optimization purposes.</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>How We Use Your Information</h2>
                    <p>We use the collected information to:</p>
                    <ul>
                        <li>Provide and maintain the JobRadar service</li>
                        <li>Improve and optimize our platform</li>
                        <li>Monitor usage patterns and detect technical issues</li>
                        <li>Communicate important updates or changes</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>Data Storage and Security</h2>
                    <h3>Local Storage</h3>
                    <p>
                        <strong>Your API credentials are never sent to our servers.</strong> They are
                        stored exclusively in your browser&apos;s localStorage. This means:
                    </p>
                    <ul>
                        <li>Only you have access to your credentials</li>
                        <li>We cannot see or access your API keys</li>
                        <li>Your credentials remain on your device</li>
                    </ul>
                    <h3>Security Measures</h3>
                    <p>
                        We implement industry-standard security measures including HTTPS encryption,
                        secure hosting, and regular security audits.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Third-Party Services</h2>
                    <p>JobRadar integrates with the following third-party services:</p>
                    <ul>
                        <li><strong>Google Custom Search API:</strong> Used to execute your job searches. Subject to <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google&apos;s Privacy Policy</a>.</li>
                        <li><strong>Analytics (if applicable):</strong> We may use analytics services to understand usage patterns.</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>Cookies and Tracking</h2>
                    <p>
                        JobRadar uses localStorage for essential functionality (storing your preferences and API credentials).
                        We do not use third-party tracking cookies for advertising purposes.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Your Rights</h2>
                    <p>You have the right to:</p>
                    <ul>
                        <li><strong>Access:</strong> Request information about data we hold</li>
                        <li><strong>Deletion:</strong> Clear your localStorage data at any time through your browser</li>
                        <li><strong>Opt-out:</strong> Disable analytics tracking if implemented</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>Children&apos;s Privacy</h2>
                    <p>
                        JobRadar is not intended for users under the age of 13. We do not knowingly
                        collect personal information from children under 13.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. We will notify you of
                        any changes by posting the new Privacy Policy on this page and updating the
                        &quot;Last Updated&quot; date.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please open an issue on our
                        GitHub repository or contact us through the information provided in our documentation.
                    </p>
                </section>

                <div className={styles.backLink}>
                    <a href="/">← Back to Home</a>
                </div>
            </div>
        </div>
    );
}
