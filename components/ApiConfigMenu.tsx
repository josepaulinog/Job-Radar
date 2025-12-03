'use client';

import { useState, useEffect, useRef } from 'react';
import { Settings, Key, Search, Save, X } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/hooks/useToast';
import Toast from '@/components/Toast';
import styles from './ApiConfigMenu.module.css';

export default function ApiConfigMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [apiKey, setApiKey] = useLocalStorage('googleApiKey', '');
    const [searchEngineId, setSearchEngineId] = useLocalStorage('searchEngineId', '');
    const [localApiKey, setLocalApiKey] = useState('');
    const [localCxId, setLocalCxId] = useState('');
    const { toast, isVisible, showToast } = useToast();
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setLocalApiKey(apiKey);
        setLocalCxId(searchEngineId);
    }, [apiKey, searchEngineId]);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleSave = () => {
        setApiKey(localApiKey.trim());
        setSearchEngineId(localCxId.trim());
        setIsOpen(false);
        showToast('API credentials saved successfully');
    };

    const isConfigured = apiKey && searchEngineId;

    if (!mounted) {
        return null;
    }

    return (
        <div className={styles.menuContainer} ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${styles.triggerBtn} ${isConfigured ? styles.ready : ''}`}
                title="Configure API Credentials"
            >
                <span className={styles.dot} />
                API {isConfigured ? 'Ready' : 'Setup'}
            </button>

            {isOpen && (
                <>
                    <div className={styles.overlay} onClick={() => setIsOpen(false)} />
                    <div className={`${styles.dropdown} ${isOpen ? styles.open : ''}`}>
                        <div className={styles.header}>
                            <Settings size={18} />
                            API Configuration
                            <button
                                onClick={() => setIsOpen(false)}
                                className={styles.closeBtn}
                                aria-label="Close"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className={styles.field}>
                            <div className={styles.label}>
                                Google API Key
                                <a
                                    href="https://console.cloud.google.com/apis/credentials"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.helpLink}
                                >
                                    Get key →
                                </a>
                            </div>
                            <div className={styles.inputWrapper}>
                                <Key size={14} className={styles.icon} />
                                <input
                                    type="password"
                                    className={styles.input}
                                    value={localApiKey}
                                    onChange={(e) => setLocalApiKey(e.target.value)}
                                    placeholder="AIza..."
                                />
                            </div>
                        </div>

                        <div className={styles.field}>
                            <div className={styles.label}>
                                Search Engine ID (CX)
                                <a
                                    href="https://programmablesearchengine.google.com/controlpanel/all"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.helpLink}
                                >
                                    Create engine →
                                </a>
                            </div>
                            <div className={styles.inputWrapper}>
                                <Search size={14} className={styles.icon} />
                                <input
                                    type="text"
                                    className={styles.input}
                                    value={localCxId}
                                    onChange={(e) => setLocalCxId(e.target.value)}
                                    placeholder="abc123def..."
                                />
                            </div>
                        </div>

                        <button className={styles.saveBtn} onClick={handleSave}>
                            <Save size={16} />
                            Save Credentials
                        </button>
                    </div>
                </>
            )}
            {/* Toast Notification */}
            {toast && <Toast message={toast.message} isVisible={isVisible} />}
        </div>
    );
}
