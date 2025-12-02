'use client';

import { Database, Briefcase, Users, FileText, ChevronRight, Zap } from 'lucide-react';
import { StrategyType } from '@/lib/types';
import { strategies } from '@/lib/strategies';
import styles from './SearchStrategies.module.css';

interface SearchStrategiesProps {
  selectedStrategy: StrategyType;
  onSelectStrategy: (strategy: StrategyType) => void;
}

const iconMap = {
  database: Database,
  briefcase: Briefcase,
  users: Users,
  'file-text': FileText
};

export default function SearchStrategies({ selectedStrategy, onSelectStrategy }: SearchStrategiesProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>
          <Zap size={14} />
          Search Strategies
        </div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.strategyList}>
          {(Object.keys(strategies) as StrategyType[]).map((key) => {
            const strategy = strategies[key];
            const Icon = iconMap[strategy.icon as keyof typeof iconMap];

            return (
              <button
                key={key}
                className={`${styles.strategyBtn} ${selectedStrategy === key ? styles.active : ''}`}
                onClick={() => onSelectStrategy(key)}
              >
                <div className={`${styles.strategyIcon} ${styles[strategy.color]}`}>
                  <Icon size={20} />
                </div>
                <div className={styles.strategyContent}>
                  <div className={styles.strategyName}>{strategy.name}</div>
                  <div className={styles.strategyDesc}>{strategy.description}</div>
                </div>
                <div className={styles.strategyArrow}>
                  <ChevronRight size={16} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
