'use client';

import { Building2, Globe, ExternalLink } from 'lucide-react';
import { GoogleSearchItem } from '@/lib/types';
import { parseJobFromSearchResult } from '@/lib/utils';
import styles from './JobCard.module.css';

interface JobCardProps {
  job: GoogleSearchItem;
}

export default function JobCard({ job }: JobCardProps) {
  const jobInfo = parseJobFromSearchResult(job);

  return (
    <div className={styles.jobCard}>
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
          </div>
        </div>
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
