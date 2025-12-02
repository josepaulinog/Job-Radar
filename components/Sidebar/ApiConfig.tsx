'use client';

import { useState } from 'react';
import { Key, Search, Save } from 'lucide-react';
import styles from './ApiConfig.module.css';

interface ApiConfigProps {
  apiKey: string;
  cxId: string;
  onSave: (apiKey: string, cxId: string) => void;
}

export default function ApiConfig({ apiKey, cxId, onSave }: ApiConfigProps) {
  const [localApiKey, setLocalApiKey] = useState(apiKey);
  const [localCxId, setLocalCxId] = useState(cxId);

  const handleSave = () => {
    onSave(localApiKey.trim(), localCxId.trim());
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>
          <Key size={14} />
          API Configuration
        </div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.apiSetup}>
          <div className={styles.apiRow}>
            <div className={styles.apiLabel}>
              Google API Key
              <a
                href="https://console.cloud.google.com/apis/credentials"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.apiHelpLink}
              >
                Get key →
              </a>
            </div>
            <div className={styles.inputGroup}>
              <Key size={16} className={styles.inputIcon} />
              <input
                type="password"
                className={`${styles.input} ${localApiKey ? styles.valid : ''}`}
                value={localApiKey}
                onChange={(e) => setLocalApiKey(e.target.value)}
                placeholder="AIza..."
              />
            </div>
          </div>

          <div className={styles.apiRow}>
            <div className={styles.apiLabel}>
              Search Engine ID (CX)
              <a
                href="https://programmablesearchengine.google.com/controlpanel/all"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.apiHelpLink}
              >
                Create engine →
              </a>
            </div>
            <div className={styles.inputGroup}>
              <Search size={16} className={styles.inputIcon} />
              <input
                type="text"
                className={`${styles.input} ${localCxId ? styles.valid : ''}`}
                value={localCxId}
                onChange={(e) => setLocalCxId(e.target.value)}
                placeholder="abc123def456..."
              />
            </div>
          </div>

          <button className={styles.saveBtn} onClick={handleSave}>
            <Save size={16} />
            Save Credentials
          </button>
        </div>
      </div>
    </div>
  );
}
