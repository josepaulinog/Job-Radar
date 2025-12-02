'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HelpModal from '@/components/HelpModal';
import { useLocalStorage, useTheme } from '@/hooks/useLocalStorage';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, toggleTheme } = useTheme();
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Check API configuration
  const [apiKey] = useLocalStorage('jobhunter_api_key', '');
  const [cxId] = useLocalStorage('jobhunter_cx_id', '');
  const apiConfigured = !!(apiKey && cxId);

  return (
    <html lang="en" data-theme={theme} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Header
          apiConfigured={apiConfigured}
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenHelp={() => setIsHelpOpen(true)}
        />
        {children}
        <Footer />
        <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      </body>
    </html>
  );
}
