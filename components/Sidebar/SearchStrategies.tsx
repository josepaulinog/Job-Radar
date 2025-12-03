'use client';

import { Database, Briefcase, Users, FileText, Globe, Building2, Linkedin, Rocket, Coins } from 'lucide-react';
import { StrategyType } from '@/lib/types';
import { enhancedStrategies } from '@/lib/enhanced-strategies';
import styles from './SearchStrategies.module.css';

interface SearchStrategiesProps {
  selectedStrategy: StrategyType;
  onSelectStrategy: (strategy: StrategyType) => void;
}

const iconMap = {
  database: Database,
  briefcase: Briefcase,
  users: Users,
  'file-text': FileText,
  globe: Globe,
  'building-2': Building2,
  linkedin: Linkedin,
  rocket: Rocket,
  coins: Coins,
};

export default function SearchStrategies({ selectedStrategy, onSelectStrategy }: SearchStrategiesProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>
          <Database size={14} />
          Search Strategies
        </div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.strategyList}>
          {(Object.keys(enhancedStrategies) as StrategyType[]).map((key) => {
            const strategy = enhancedStrategies[key];
            const Icon = iconMap[strategy.icon as keyof typeof iconMap];

            return (
              <button
                key={key}
                className={`${styles.strategyBtn} ${selectedStrategy === key ? styles.active : ''}`}
                onClick={() => onSelectStrategy(key)}
              >
                <div className={`${styles.strategyIcon} ${styles[strategy.color]}`}>
                  {Icon && <Icon size={20} />}
                </div>
                <div className={styles.strategyContent}>
                  <div className={styles.strategyName}>{strategy.name}</div>
                  <div className={styles.strategyDesc}>{strategy.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
