import { Briefcase } from 'lucide-react';
import { WORK_LOCATIONS, WorkLocationType } from '@/lib/work-location';
import styles from './WorkLocationFilter.module.css';

interface WorkLocationFilterProps {
  selectedTypes: WorkLocationType[];
  onTypesChange: (types: WorkLocationType[]) => void;
}

export default function WorkLocationFilter({
  selectedTypes,
  onTypesChange
}: WorkLocationFilterProps) {
  const toggleType = (type: WorkLocationType) => {
    if (selectedTypes.includes(type)) {
      onTypesChange(selectedTypes.filter(t => t !== type));
    } else {
      onTypesChange([...selectedTypes, type]);
    }
  };

  const clearAll = () => {
    onTypesChange([]);
  };

  const selectAll = () => {
    onTypesChange(Object.keys(WORK_LOCATIONS) as WorkLocationType[]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>
          <Briefcase size={14} />
          Work Location
        </div>
        <div className={styles.actions}>
          <button
            onClick={selectAll}
            className={styles.actionButton}
            type="button"
          >
            All
          </button>
          <button
            onClick={clearAll}
            className={styles.actionButton}
            type="button"
          >
            Clear
          </button>
        </div>
      </div>

      <div className={styles.cardBody}>
        {Object.values(WORK_LOCATIONS).map((location) => {
          const Icon = location.icon;
          const isSelected = selectedTypes.includes(location.type);

          return (
            <button
              key={location.type}
              onClick={() => toggleType(location.type)}
              className={`${styles.type} ${isSelected ? styles.selected : ''}`}
              type="button"
            >
              <div className={`${styles.locationIcon} ${styles[location.type]}`}>
                <Icon size={20} />
              </div>
              <span className={styles.typeName}>{location.label}</span>
            </button>
          );
        })}
      </div>

      {selectedTypes.length > 0 && selectedTypes.length < Object.keys(WORK_LOCATIONS).length && (
        <div className={styles.selectedCount}>
          {selectedTypes.length} {selectedTypes.length === 1 ? 'type' : 'types'} selected
        </div>
      )}
    </div>
  );
}
