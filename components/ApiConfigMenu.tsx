'use client';

import { useState, useRef, useEffect } from 'react';
import { Key, Search, Save, Settings } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import styles from './ApiConfigMenu.module.css';

export default function ApiConfigMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [apiKey, setApiKey] = useLocalStorage('jobhunter_api_key', '');
    const [cxId, setCxId] = useLocalStorage('jobhunter_cx_id', '');

    const [localApiKey, setLocalApiKey] = useState(apiKey);
    const [localCxId, setLocalCxId] = useState(cxId);

    const menuRef = useRef<HTMLDivElement>(null);

    // Sync local state when storage changes (from other components)
    useEffect(() => {
        setLocalApiKey(apiKey);
        setLocalCxId(cxId);
    }, [apiKey, cxId]);

    const handleSave = () => {
        setApiKey(localApiKey.trim());
        setCxId(localCxId.trim());
        setIsOpen(false);
    };

    const isConfigured = !!(apiKey && cxId);

    return (
        <div className={styles.menuContainer} ref={menuRef}>
            <button
                className={`${styles.triggerBtn} ${isConfigured ? styles.ready : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                title="Configure API Credentials"
            >
                <span className={styles.dot} />
                <span>{isConfigured ? 'API Ready' : 'Setup API'}</span>
            </button>

            {isOpen && (
                <>
                    <div className={styles.overlay} onClick={() => setIsOpen(false)} />
                    <div className={styles.dropdown}>
                        <div className={styles.header}>
                            <Settings size={16} />
                            API Configuration
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
        </div>
    );
}
