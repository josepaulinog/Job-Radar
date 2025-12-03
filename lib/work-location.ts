import { Home, Shuffle, Building2, HelpCircle, LucideIcon } from 'lucide-react';

export type WorkLocationType = 'remote' | 'hybrid' | 'onsite' | 'unknown';

export interface WorkLocation {
  type: WorkLocationType;
  label: string;
  icon: LucideIcon;
  color: string;
}

export const WORK_LOCATIONS: Record<WorkLocationType, WorkLocation> = {
  remote: {
    type: 'remote',
    label: 'Remote',
    icon: Home,
    color: '#00d4aa',
  },
  hybrid: {
    type: 'hybrid',
    label: 'Hybrid',
    icon: Shuffle,
    color: '#4A90E2',
  },
  onsite: {
    type: 'onsite',
    label: 'On-site',
    icon: Building2,
    color: '#F5A623',
  },
  unknown: {
    type: 'unknown',
    label: 'Not Specified',
    icon: HelpCircle,
    color: '#808080',
  },
};

/**
 * Detect work location type from job title and description
 */
export function detectWorkLocation(title: string, snippet: string = ''): WorkLocationType {
  const searchText = `${title} ${snippet}`.toLowerCase();

  // Remote keywords
  const remoteKeywords = [
    'remote',
    'work from home',
    'wfh',
    'distributed',
    'anywhere',
    'location independent',
    'remote-first',
    'fully remote',
    '100% remote',
  ];

  // Hybrid keywords
  const hybridKeywords = [
    'hybrid',
    'flexible',
    'remote/office',
    'office/remote',
    'partially remote',
    'remote + office',
  ];

  // On-site keywords
  const onsiteKeywords = [
    'on-site',
    'onsite',
    'in-office',
    'in office',
    'on site',
    'at office',
    'office-based',
  ];

  // Check for remote
  if (remoteKeywords.some(keyword => searchText.includes(keyword))) {
    // But check if it's actually hybrid
    if (hybridKeywords.some(keyword => searchText.includes(keyword))) {
      return 'hybrid';
    }
    return 'remote';
  }

  // Check for hybrid
  if (hybridKeywords.some(keyword => searchText.includes(keyword))) {
    return 'hybrid';
  }

  // Check for on-site
  if (onsiteKeywords.some(keyword => searchText.includes(keyword))) {
    return 'onsite';
  }

  // Default to unknown if we can't determine
  return 'unknown';
}

/**
 * Get work location info by type
 */
export function getWorkLocationInfo(type: WorkLocationType): WorkLocation {
  return WORK_LOCATIONS[type] || WORK_LOCATIONS.unknown;
}

/**
 * Get all work location types
 */
export function getAllWorkLocationTypes(): WorkLocationType[] {
  return Object.keys(WORK_LOCATIONS) as WorkLocationType[];
}
