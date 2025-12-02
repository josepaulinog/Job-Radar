'use client';

import { CheckCircle } from 'lucide-react';
import styles from './Toast.module.css';

interface ToastProps {
  message: string;
  isVisible: boolean;
}

export default function Toast({ message, isVisible }: ToastProps) {
  return (
    <div className={`${styles.toast} ${isVisible ? styles.show : ''}`}>
      <CheckCircle className={styles.toastIcon} size={24} />
      <span className={styles.toastMessage}>{message}</span>
    </div>
  );
}
