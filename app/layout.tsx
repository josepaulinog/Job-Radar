'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLocalStorage, useTheme } from '@/hooks/useLocalStorage';
import './globals.css';

import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, toggleTheme } = useTheme();

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
        />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
