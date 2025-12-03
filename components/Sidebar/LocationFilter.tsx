'use client';

import { MapPin } from 'lucide-react';
import { popularLocations } from '@/lib/enhanced-strategies';
import styles from './LocationFilter.module.css';

interface LocationFilterProps {
    selectedLocation: string;
    onLocationChange: (location: string) => void;
}

export default function LocationFilter({ selectedLocation, onLocationChange }: LocationFilterProps) {
    return (
        <div className={styles.container}>
            <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>
                    <MapPin size={14} />
                    Location
                </div>
            </div>
            <div className={styles.cardBody}>
                <select
                    id="location"
                    value={selectedLocation}
                    onChange={(e) => onLocationChange(e.target.value)}
                    className={styles.select}
                >
                    <option value="">All Locations</option>
                    <optgroup label="Remote Options">
                        {popularLocations
                            .filter(loc => loc.isRemote)
                            .map(loc => (
                                <option key={loc.value} value={loc.value}>
                                    {loc.name}
                                </option>
                            ))}
                    </optgroup>
                    <optgroup label="Cities">
                        {popularLocations
                            .filter(loc => !loc.isRemote)
                            .map(loc => (
                                <option key={loc.value} value={loc.value}>
                                    {loc.name}
                                </option>
                            ))}
                    </optgroup>
                </select>

                {selectedLocation && (
                    <button
                        onClick={() => onLocationChange('')}
                        className={styles.clearButton}
                        title="Clear location filter"
                    >
                        Clear
                    </button>
                )}
            </div>
        </div>
    );
}
