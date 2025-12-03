'use client';

import React, { useRef, useEffect } from 'react';
import { Building2, Globe, ExternalLink, Heart } from 'lucide-react';
import { GoogleSearchItem } from '@/lib/types';
import { parseJobFromSearchResult } from '@/lib/utils';
import { getCategoryById } from '@/lib/job-categories';
import { getWorkLocationInfo } from '@/lib/work-location';
import { gsap } from '@/lib/animations';
import styles from './JobCard.module.css';

interface JobCardProps {
  job: GoogleSearchItem;
  isFavorite?: boolean;
  onToggleFavorite?: (job: GoogleSearchItem) => void;
  index?: number;
}

export default function JobCard({ job, isFavorite = false, onToggleFavorite, index = 0 }: JobCardProps) {
  const jobInfo = parseJobFromSearchResult(job);
  const category = job.category ? getCategoryById(job.category) : null;
  const workLocation = job.workLocation ? getWorkLocationInfo(job.workLocation) : null;
  const cardRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<SVGSVGElement>(null);

  // Entrance animation
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          delay: index * 0.1,
          ease: 'power2.out',
        }
      );
    }
  }, [index]);

  // Heart animation when favorite state changes
  useEffect(() => {
    if (heartRef.current && isFavorite) {
      gsap.fromTo(
        heartRef.current,
        { scale: 1 },
        {
          scale: 1.3,
          duration: 0.2,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
        }
      );
    }
  }, [isFavorite]);

  return (
    <div ref={cardRef} className={styles.jobCard}>
      <div className={styles.jobHeader}>
        <div className={styles.jobMain}>
          <h3 className={styles.jobTitle}>
            <a href={jobInfo.link} target="_blank" rel="noopener noreferrer">
              {jobInfo.title}
            </a>
          </h3>
          <div className={styles.jobMeta}>
            <span className={styles.jobCompany}>
              <Building2 size={14} />
              {jobInfo.company}
            </span>
            <span className={styles.jobSource}>
              <Globe size={12} />
              {jobInfo.source}
            </span>
            {workLocation && (
              <span
                className={styles.workLocationBadge}
                style={{ borderColor: workLocation.color, color: workLocation.color }}
              >
                {React.createElement(workLocation.icon, { size: 12 })}
                {workLocation.label}
              </span>
            )}
            {category && (
              <span
                className={styles.categoryBadge}
                style={{ borderColor: category.color, color: category.color }}
              >
                {React.createElement(category.icon, { size: 12 })}
                {category.name}
              </span>
            )}
          </div>
        </div>

        {onToggleFavorite && (
          <button
            onClick={() => onToggleFavorite(job)}
            className={`${styles.favoriteBtn} ${isFavorite ? styles.isFavorite : ''}`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart ref={heartRef} size={20} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>

      <p className={styles.jobSnippet}>{jobInfo.snippet}</p>

      <div className={styles.jobFooter}>
        <span className={styles.jobUrl}>{jobInfo.displayLink}</span>
        <a
          href={jobInfo.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.jobApplyBtn}
        >
          View Job
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}
