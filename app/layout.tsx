import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'JobRadar — Remote Job Hunter',
  description: 'Find hidden remote job opportunities using advanced Google search operators. Search directly on company ATS platforms like Greenhouse, Lever, and Workable.',
  keywords: ['remote jobs', 'job search', 'ATS', 'Greenhouse', 'Lever', 'job hunting', 'Google Custom Search'],
  authors: [{ name: 'Jose Paulino', url: 'https://josepaulino.com' }],
  creator: 'Jose Paulino',
  openGraph: {
    title: 'JobRadar — Remote Job Hunter',
    description: 'Find hidden remote job opportunities using advanced search operators',
    url: 'https://jobradar.app',
    siteName: 'JobRadar',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JobRadar — Remote Job Hunter',
    description: 'Find hidden remote job opportunities using advanced search operators',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f9fa' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0b' }
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
