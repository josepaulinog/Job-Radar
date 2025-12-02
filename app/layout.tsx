'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HelpModal from '@/components/HelpModal';
import { useLocalStorage, useTheme } from '@/hooks/useLocalStorage';
import './globals.css';

import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, toggleTheme } = useTheme();
  const [isHelpOpen, setIsHelpOpen] = useState(false);



  return (
    <html lang="en" data-theme={theme} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Header
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenHelp={() => setIsHelpOpen(true)}
        />
        {children}
        <Analytics />
        <Footer />
        <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      </body>
    </html>
  );
}
