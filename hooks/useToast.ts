import { useState, useCallback } from 'react';

export interface Toast {
  message: string;
  type?: 'success' | 'error' | 'info';
}

/**
 * Custom hook for managing toast notifications
 */
export function useToast() {
  const [toast, setToast] = useState<Toast | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const showToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    setToast({ message, type });
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setToast(null), 300); // Wait for animation to complete
    }, 3000);
  }, []);

  const hideToast = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => setToast(null), 300);
  }, []);

  return {
    toast,
    isVisible,
    showToast,
    hideToast
  };
}
