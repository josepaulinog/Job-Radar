import { StrategyType, Location } from './types';

// Comprehensive list of ATS platforms and job sites
export const atsPlatforms = [
  'greenhouse.io',
  'lever.co',
  'workable.com',
  'ashbyhq.com',
  'breezy.hr',
  'jobs.jobvite.com',
  'recruitee.com',
  'smartrecruiters.com',
  'workday.com',
  'icims.com',
  'successfactors.com',
  'taleo.net',
  'myworkdayjobs.com',
  'ultipro.com',
  'bamboohr.com',
  'jazz.co',
  'pinpointhq.com',
  'comeet.com',
  'freshteam.com',
  'fountain.com',
  'hire.google.com',
  'jobs.apple.com',
  'amazon.jobs',
  'careers.microsoft.com',
  'careers.google.com',
  'facebook.com/careers',
  'netflix.jobs',
  'tesla.com/careers',
  'stripe.com/jobs',
  'shopify.com/careers',
  'airbnb.com/careers',
  'uber.com/careers',
  'spotify.com/jobs',
  'snap.com/jobs',
  'twitter.com/careers',
  'linkedin.com/jobs',
  'paypal.com/jobs',
  'salesforce.com/careers',
  'adobe.com/careers',
  'oracle.com/careers',
  'vmware.com/careers',
  'atlassian.com/company/careers',
  'zoom.us/careers',
  'dropbox.com/jobs',
  'twilio.com/company/jobs',
  'datadog.com/careers',
  'mongodb.com/careers',
  'elastic.co/careers',
  'confluent.io/careers',
  'databricks.com/company/careers'
];

// Job boards and communities
export const jobBoards = [
  'weworkremotely.com',
  'remotive.io',
  'remote.co',
  'flexjobs.com',
  'angel.co',
  'ycombinator.com/jobs',
  'stackoverflow.com/jobs',
  'github.com/jobs',
  'dribbble.com/jobs',
  'behance.net/joblist',
  'authenticjobs.com',
  'landing.jobs',
  'nodesk.co/remote-jobs',
  'remoteleaf.com',
  'jobspresso.co',
  'remoteok.io',
  'outsourcely.com',
  'powertofly.com',
  'remoters.net',
  'justremote.co',
  'remote4me.com',
  'workingnomads.co',
  'remotehub.io',
  'dynamitejobs.com',
  'europelanguagejobs.com',
  'remoteco.com',
  'himalayas.app',
  'pangian.com',
  'wellfound.com'
];

// Location-based search
export const popularLocations: Location[] = [
  { name: 'Remote (Global)', value: 'remote', isRemote: true },
  { name: 'Remote (US)', value: 'remote USA', isRemote: true },
  { name: 'Remote (Europe)', value: 'remote Europe', isRemote: true },
  { name: 'Remote (Asia)', value: 'remote Asia', isRemote: true },
  { name: 'United States', value: 'United States', isRemote: false },
  { name: 'New York, NY', value: 'New York', isRemote: false },
  { name: 'San Francisco, CA', value: 'San Francisco', isRemote: false },
  { name: 'Los Angeles, CA', value: 'Los Angeles', isRemote: false },
  { name: 'Seattle, WA', value: 'Seattle', isRemote: false },
  { name: 'Austin, TX', value: 'Austin', isRemote: false },
  { name: 'Boston, MA', value: 'Boston', isRemote: false },
  { name: 'Chicago, IL', value: 'Chicago', isRemote: false },
  { name: 'Denver, CO', value: 'Denver', isRemote: false },
  { name: 'London, UK', value: 'London', isRemote: false },
  { name: 'Berlin, Germany', value: 'Berlin', isRemote: false },
  { name: 'Amsterdam, Netherlands', value: 'Amsterdam', isRemote: false },
  { name: 'Paris, France', value: 'Paris', isRemote: false },
  { name: 'Toronto, Canada', value: 'Toronto', isRemote: false },
  { name: 'Singapore', value: 'Singapore', isRemote: false },
  { name: 'Sydney, Australia', value: 'Sydney', isRemote: false },
  { name: 'Tokyo, Japan', value: 'Tokyo', isRemote: false },
  { name: 'Dubai, UAE', value: 'Dubai', isRemote: false }
];

export interface EnhancedSearchStrategy {
  name: string;
  description: string;
  icon: string;
  color: 'blue' | 'green' | 'orange' | 'purple' | 'pink' | 'yellow';
  buildQuery: (keywords: string, exclusions: string, location?: string) => string;
  category: 'ats' | 'boards' | 'companies' | 'communities' | 'documents';
}

export const enhancedStrategies: Record<string, EnhancedSearchStrategy> = {
  ats: {
    name: 'ATS X-Ray',
    description: 'Greenhouse, Lever, Workable + 50 more',
    icon: 'database',
    color: 'blue',
    category: 'ats',
    buildQuery: (keywords: string, exclusions: string, location?: string) => {
      const topATS = atsPlatforms.slice(0, 30);
      const sites = topATS.map(ats => `site:${ats}`).join(' OR ');
      const exclude = exclusions.trim()
        ? ' ' + exclusions.split(',').map(e => `-"${e.trim()}"`).join(' ')
        : '';

      let loc = ' remote';
      if (location && location !== 'remote') {
        // Only quote multi-word locations to be less strict
        loc = location.includes(' ') ? ` "${location}"` : ` ${location}`;
      }

      return `(${sites}) "${keywords}"${loc}${exclude}`;
    }
  },

  careers: {
    name: 'Career Pages',
    description: 'Direct company hiring pages',
    icon: 'briefcase',
    color: 'green',
    category: 'companies',
    buildQuery: (keywords: string, exclusions: string, location?: string) => {
      const exclude = exclusions.trim()
        ? ' ' + exclusions.split(',').map(e => `-"${e.trim()}"`).join(' ')
        : '';
      const excludeSites = [
        '-site:linkedin.com',
        '-site:indeed.com',
        '-site:glassdoor.com',
        '-site:ziprecruiter.com',
        '-site:monster.com'
      ].join(' ');
      let loc = ' remote';
      if (location && location !== 'remote') {
        loc = location.includes(' ') ? ` "${location}"` : ` ${location}`;
      }
      return `(intitle:"careers" OR intitle:"jobs" OR inurl:careers OR inurl:jobs) "${keywords}"${loc}${exclude} ${excludeSites}`;
    }
  },

  jobBoards: {
    name: 'Remote Job Boards',
    description: 'WeWorkRemotely, Remote.co + 25 more',
    icon: 'globe',
    color: 'pink',
    category: 'boards',
    buildQuery: (keywords: string, exclusions: string, location?: string) => {
      const topBoards = jobBoards.slice(0, 10);
      const sites = topBoards.map(board => `site:${board}`).join(' OR ');
      const exclude = exclusions.trim()
        ? ' ' + exclusions.split(',').map(e => `-"${e.trim()}"`).join(' ')
        : '';
      let loc = '';
      if (location && location !== 'remote') {
        loc = location.includes(' ') ? ` "${location}"` : ` ${location}`;
      }
      return `(${sites}) "${keywords}" remote${loc}${exclude}`;
    }
  },

  techCompanies: {
    name: 'Tech Giants',
    description: 'Google, Apple, Amazon, Microsoft, etc.',
    icon: 'building-2',
    color: 'yellow',
    category: 'companies',
    buildQuery: (keywords: string, exclusions: string, location?: string) => {
      const techGiants = [
        'site:careers.google.com',
        'site:jobs.apple.com',
        'site:amazon.jobs',
        'site:careers.microsoft.com',
        'site:facebook.com/careers',
        'site:netflix.jobs',
        'site:tesla.com/careers',
        'site:stripe.com/jobs',
        'site:shopify.com/careers',
        'site:airbnb.com/careers',
        'site:uber.com/careers',
        'site:spotify.com/jobs'
      ].join(' OR ');
      const exclude = exclusions.trim()
        ? ' ' + exclusions.split(',').map(e => `-"${e.trim()}"`).join(' ')
        : '';
      let loc = ' remote';
      if (location && location !== 'remote') {
        loc = location.includes(' ') ? ` "${location}"` : ` ${location}`;
      }
      return `(${techGiants}) "${keywords}"${loc}${exclude}`;
    }
  },

  community: {
    name: 'Communities',
    description: 'Reddit, HN, forums',
    icon: 'users',
    color: 'orange',
    category: 'communities',
    buildQuery: (keywords: string, exclusions: string, location?: string) => {
      const sites = [
        'site:reddit.com/r/forhire',
        'site:reddit.com/r/remotejobs',
        'site:reddit.com/r/jobbit',
        'site:news.ycombinator.com',
        'site:indiehackers.com'
      ].join(' OR ');
      const exclude = exclusions.trim()
        ? ' ' + exclusions.split(',').map(e => `-"${e.trim()}"`).join(' ')
        : '';
      let loc = ' remote';
      if (location && location !== 'remote') {
        loc = location.includes(' ') ? ` "${location}"` : ` ${location}`;
      }
      return `(${sites}) ("hiring" OR "job") "${keywords}"${loc}${exclude}`;
    }
  },

  docs: {
    name: 'Documents',
    description: 'Public PDFs & job specs',
    icon: 'file-text',
    color: 'purple',
    category: 'documents',
    buildQuery: (keywords: string, exclusions: string, location?: string) => {
      const exclude = exclusions.trim()
        ? ' ' + exclusions.split(',').map(e => `-"${e.trim()}"`).join(' ')
        : '';
      let loc = ' remote';
      if (location && location !== 'remote') {
        loc = location.includes(' ') ? ` "${location}"` : ` ${location}`;
      }
      return `(filetype:pdf OR filetype:doc) (intitle:"job description" OR intitle:"job posting" OR intitle:"hiring") "${keywords}"${loc}${exclude}`;
    }
  }
};

export function getStrategyQuery(
  strategyType: string,
  keywords: string,
  exclusions: string,
  location?: string
): string {
  const strategy = enhancedStrategies[strategyType];
  if (!strategy) {
    return enhancedStrategies['ats'].buildQuery(keywords, exclusions, location);
  }
  return strategy.buildQuery(keywords, exclusions, location);
}

export function getGoogleSearchUrl(query: string, dateRestrict?: string): string {
  let url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

  if (dateRestrict) {
    const tbs = dateRestrict === 'd1' ? 'qdr:d' :
      dateRestrict === 'w1' ? 'qdr:w' :
        dateRestrict === 'm1' ? 'qdr:m' : '';
    if (tbs) url += `&tbs=${tbs}`;
  }

  return url;
}

// Get all strategy keys for iteration
export function getAllStrategies() {
  return Object.keys(enhancedStrategies) as Array<keyof typeof enhancedStrategies>;
}

// Get strategies by category
export function getStrategiesByCategory(category: EnhancedSearchStrategy['category']) {
  return Object.entries(enhancedStrategies)
    .filter(([_, strategy]) => strategy.category === category)
    .map(([key, strategy]) => ({ key, ...strategy }));
}
