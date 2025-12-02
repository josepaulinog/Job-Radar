import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import styles from '../privacy/page.module.css';

export const metadata: Metadata = generatePageMetadata('terms');

export default function TermsPage() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1>Terms of Service</h1>
                <p className={styles.lastUpdated}>Last Updated: December 1, 2024</p>

                <section className={styles.section}>
                    <h2>Acceptance of Terms</h2>
                    <p>
                        By accessing and using JobRadar, you accept and agree to be bound by the terms
                        and conditions of this agreement. If you do not agree to these terms, please
                        do not use our service.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Description of Service</h2>
                    <p>
                        JobRadar is a job search tool that helps you find job opportunities using
                        Google Custom Search API. The service allows you to:
                    </p>
                    <ul>
                        <li>Search for jobs across multiple platforms and ATS systems</li>
                        <li>Use advanced search strategies to find hidden job opportunities</li>
                        <li>Access job listings from various sources</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>User Responsibilities</h2>
                    <h3>API Credentials</h3>
                    <p>You are responsible for:</p>
                    <ul>
                        <li>Obtaining and maintaining valid Google Custom Search API credentials</li>
                        <li>Keeping your API credentials secure</li>
                        <li>Any charges incurred through your Google Cloud account</li>
                        <li>Complying with Google&apos;s API Terms of Service</li>
                    </ul>
                    <h3>Acceptable Use</h3>
                    <p>You agree to:</p>
                    <ul>
                        <li>Use JobRadar for lawful job search purposes only</li>
                        <li>Not attempt to circumvent any limitations or security measures</li>
                        <li>Not use the service to spam, harass, or engage in malicious activity</li>
                        <li>Respect the terms of service of job boards and platforms you access</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>Google API Usage</h2>
                    <p>
                        JobRadar uses the Google Custom Search API. Your use of this service is also
                        subject to <a href="https://developers.google.com/terms" target="_blank" rel="noopener noreferrer">Google&apos;s API Terms of Service</a>.
                        You are responsible for:
                    </p>
                    <ul>
                        <li>Complying with Google&apos;s usage quotas and limits</li>
                        <li>Any costs associated with API usage beyond the free tier</li>
                        <li>Ensuring your API credentials remain valid</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>Disclaimer of Warranties</h2>
                    <p>
                        JobRadar is provided &quot;as is&quot; and &quot;as available&quot; without any warranties of any kind,
                        either express or implied, including but not limited to:
                    </p>
                    <ul>
                        <li>Accuracy, reliability, or completeness of job listings</li>
                        <li>Availability of specific job opportunities</li>
                        <li>Uninterrupted or error-free service</li>
                        <li>Results or outcomes from using the service</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>Limitation of Liability</h2>
                    <p>
                        To the fullest extent permitted by law, JobRadar and its creators shall not be
                        liable for any indirect, incidental, special, consequential, or punitive damages,
                        including but not limited to:
                    </p>
                    <ul>
                        <li>Loss of job opportunities or employment</li>
                        <li>Costs incurred from Google API usage</li>
                        <li>Data loss or corruption</li>
                        <li>Third-party services or platforms accessed through JobRadar</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>Intellectual Property</h2>
                    <p>
                        JobRadar is open-source software licensed under the MIT License. You are free to:
                    </p>
                    <ul>
                        <li>Use, copy, modify, and distribute the software</li>
                        <li>Use the software for commercial purposes</li>
                    </ul>
                    <p>
                        The JobRadar name, logo, and branding remain the property of the creators.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Third-Party Content</h2>
                    <p>
                        Job listings and content displayed through JobRadar are sourced from third-party
                        websites and services. We do not:
                    </p>
                    <ul>
                        <li>Verify the accuracy of job postings</li>
                        <li>Endorse any specific employer or opportunity</li>
                        <li>Guarantee the legitimacy of job listings</li>
                        <li>Take responsibility for application processes or outcomes</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>Modifications to Service</h2>
                    <p>
                        We reserve the right to modify, suspend, or discontinue any part of JobRadar
                        at any time without notice. We are not liable for any modification, suspension,
                        or discontinuation of the service.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Changes to Terms</h2>
                    <p>
                        We may update these Terms of Service from time to time. Changes will be effective
                        immediately upon posting. Your continued use of JobRadar after changes constitutes
                        acceptance of the new terms.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Governing Law</h2>
                    <p>
                        These terms shall be governed by and construed in accordance with applicable laws,
                        without regard to conflict of law provisions.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Contact</h2>
                    <p>
                        For questions about these Terms of Service, please open an issue on our GitHub
                        repository or contact us through the information provided in our documentation.
                    </p>
                </section>

                <div className={styles.backLink}>
                    <a href="/">← Back to Home</a>
                </div>
            </div>
        </div>
    );
}
