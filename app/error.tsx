'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

/**
 * Error boundary component for catching and displaying errors
 * Follows Next.js 14+ conventions for error handling
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          backgroundColor: 'var(--bg-primary, #0a0a0b)',
          color: 'var(--text-primary, #f5f5f7)'
        }}>
          <div style={{
            maxWidth: '500px',
            width: '100%',
            textAlign: 'center',
            padding: '2rem',
            backgroundColor: 'var(--bg-secondary, #1a1a1d)',
            borderRadius: '12px',
            border: '1px solid var(--border-color, #2a2a2d)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '1.5rem'
            }}>
              <AlertCircle size={48} color="var(--accent-primary, #00d4aa)" />
            </div>

            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: 'var(--text-primary, #f5f5f7)'
            }}>
              Something went wrong
            </h1>

            <p style={{
              fontSize: '1rem',
              marginBottom: '2rem',
              color: 'var(--text-secondary, #a0a0a5)',
              lineHeight: '1.6'
            }}>
              We encountered an unexpected error. This has been logged and we'll look into it.
            </p>

            {error.message && (
              <details style={{
                marginBottom: '2rem',
                textAlign: 'left',
                padding: '1rem',
                backgroundColor: 'var(--bg-primary, #0a0a0b)',
                borderRadius: '8px',
                border: '1px solid var(--border-color, #2a2a2d)',
                fontSize: '0.875rem',
                color: 'var(--text-secondary, #a0a0a5)'
              }}>
                <summary style={{ cursor: 'pointer', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Error details
                </summary>
                <code style={{ wordBreak: 'break-word' }}>
                  {error.message}
                </code>
              </details>
            )}

            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={reset}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'var(--accent-primary, #00d4aa)',
                  color: 'var(--bg-primary, #0a0a0b)',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.opacity = '0.9';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <RefreshCw size={18} />
                Try again
              </button>

              <a
                href="/"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'var(--bg-tertiary, #2a2a2d)',
                  color: 'var(--text-primary, #f5f5f7)',
                  border: '1px solid var(--border-color, #3a3a3d)',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-primary, #00d4aa)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color, #3a3a3d)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Home size={18} />
                Go home
              </a>
            </div>

            {error.digest && (
              <p style={{
                marginTop: '2rem',
                fontSize: '0.75rem',
                color: 'var(--text-tertiary, #6a6a6f)',
              }}>
                Error ID: {error.digest}
              </p>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
