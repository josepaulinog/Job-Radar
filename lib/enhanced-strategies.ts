import { StrategyType, Location } from './types';

// Top ATS platforms (most popular, best quality results)
// Limiting to 8 platforms to avoid Google query issues with too many OR operators
export const topATS = [
  'greenhouse.io',
  'lever.co',
  'ashbyhq.com',
  'workable.com',
  'smartrecruiters.com',
  'myworkdayjobs.com',
  'icims.com',
  'taleo.net',
];

// Comprehensive list of ATS platforms and job sites (for reference)
export const atsPlatforms = [
  // Major ATS platforms
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

  // Modern/newer ATS platforms
  'rippling.com',
  'gusto.com',
  'personio.com',
  'teamtailor.com',
  'wd1.myworkdayjobs.com',
  'wd5.myworkdayjobs.com',
  'applytojob.com',
  'hrmdirect.com',
  'paylocity.com',
  'namely.com',
  'ceridian.com',
  'adp.com',
  'paychex.com',

  // Tech company career pages
  'hire.google.com',
  'jobs.apple.com',
  'amazon.jobs',
  'careers.microsoft.com',
  'careers.google.com',
  'facebook.com',
  'meta.com',
  'netflix.jobs',
  'tesla.com',
  'stripe.com',
  'shopify.com',
  'airbnb.com',
  'uber.com',
  'spotify.com',
  'snap.com',
  'twitter.com',
  'linkedin.com',
  'paypal.com',
  'salesforce.com',
  'adobe.com',
  'oracle.com',
  'vmware.com',
  'atlassian.com',
  'zoom.us',
  'dropbox.com',
  'twilio.com',
  'datadog.com',
  'mongodb.com',
  'elastic.co',
  'confluent.io',
  'databricks.com',
  'notion.so',
  'figma.com',
  'canva.com',
  'miro.com',
  'airtable.com',
  'retool.com'
];

// Job boards and communities
export const jobBoards = [
  // Top remote job boards
  'weworkremotely.com',
  'remotive.io',
  'remote.co',
  'flexjobs.com',
  'remoteok.io',
  'remoteco.com',
  'himalayas.app',
  'wellfound.com',

  // Startup and tech job boards
  'angel.co',
  'ycombinator.com/jobs',
  'ycombinator.com/companies',
  'workatastartup.com',
  'angellist.com',
  'startupjobs.com',

  // Developer job boards
  'stackoverflow.com/jobs',
  'github.com/jobs',
  'dev.to/jobs',
  'codepen.io/jobs',
  'hashjob.com',
  'relocate.me',

  // Design job boards
  'dribbble.com/jobs',
  'behance.net/joblist',
  'cofolios.com/jobs',
  'uxjobsboard.com',

  // General job boards
  'authenticjobs.com',
  'landing.jobs',
  'nodesk.co/remote-jobs',
  'remoteleaf.com',
  'jobspresso.co',
  'outsourcely.com',
  'powertofly.com',
  'remoters.net',
  'justremote.co',
  'remote4me.com',
  'workingnomads.co',
  'remotehub.io',
  'dynamitejobs.com',
  'europelanguagejobs.com',
  'pangian.com',

  // Niche and specialized boards
  'skipthedrive.com',
  'virtualvocations.com',
  'remotewoman.com',
  'workfromhomejobs.com',
  'dailyremote.com',
  'remoteleads.io',
  'findremotework.com',
  'remote.tools/jobs',
  'nocommutejobs.com',
  'workremote.cc'
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
    description: 'Top 8 ATS Platforms (Greenhouse, Lever, etc.)',
    icon: 'database',
    color: 'blue',
    category: 'ats',
    buildQuery: (keywords: string, exclusions: string, location?: string) => {
      // Use only top 8 ATS platforms to avoid Google query issues with too many OR operators
      const sites = topATS.map(ats => `site:${ats}`).join(' OR ');
      const exclude = exclusions.trim()
        ? ' ' + exclusions.split(',').map(e => `-"${e.trim()}"`).join(' ')
        : '';

      // Always quote location for exact matching, including "remote"
      let loc = ' "remote"';
      if (location && location !== 'remote') {
        loc = ` "${location}"`;
      }

      // Don't add intitle/inurl when using site: operators - they conflict
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

      // Always quote location for exact matching, including "remote"
      let loc = ' "remote"';
      if (location && location !== 'remote') {
        loc = ` "${location}"`;
      }

      return `(intitle:"careers" OR intitle:"jobs" OR inurl:careers OR inurl:jobs) "${keywords}"${loc}${exclude} ${excludeSites}`;
    }
  },

  jobBoards: {
    name: 'Remote Job Boards',
    description: 'WeWorkRemotely, Remote.co + 50 more',
    icon: 'globe',
    color: 'pink',
    category: 'boards',
    buildQuery: (keywords: string, exclusions: string, location?: string) => {
      // Use top 15 job boards for better coverage
      const topBoards = jobBoards.slice(0, 15);
      const sites = topBoards.map(board => `site:${board}`).join(' OR ');
      const exclude = exclusions.trim()
        ? ' ' + exclusions.split(',').map(e => `-"${e.trim()}"`).join(' ')
        : '';

      // Always quote location for exact matching
      let loc = '';
      if (location && location !== 'remote') {
        loc = ` "${location}"`;
      }

      return `(${sites}) "${keywords}" "remote"${loc}${exclude}`;
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
        'site:facebook.com',
        'site:netflix.jobs',
        'site:tesla.com',
        'site:stripe.com',
        'site:shopify.com',
        'site:airbnb.com',
        'site:uber.com',
        'site:spotify.com'
      ].join(' OR ');
      const exclude = exclusions.trim()
        ? ' ' + exclusions.split(',').map(e => `-"${e.trim()}"`).join(' ')
        : '';

      // Always quote location for exact matching, including "remote"
      let loc = ' "remote"';
      if (location && location !== 'remote') {
        loc = ` "${location}"`;
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

      // Always quote location for exact matching, including "remote"
      let loc = ' "remote"';
      if (location && location !== 'remote') {
        loc = ` "${location}"`;
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

      // Always quote location for exact matching, including "remote"
      let loc = ' "remote"';
      if (location && location !== 'remote') {
        loc = ` "${location}"`;
      }

      return `(filetype:pdf OR filetype:doc) (intitle:"job description" OR intitle:"job posting" OR intitle:"hiring") "${keywords}"${loc}${exclude}`;
    }
  },

  linkedin: {
    name: 'LinkedIn X-Ray',
    description: 'Find jobs via LinkedIn profile search',
    icon: 'linkedin',
    color: 'blue',
    category: 'boards',
    buildQuery: (keywords: string, exclusions: string, location?: string) => {
      const exclude = exclusions.trim()
        ? ' ' + exclusions.split(',').map(e => `-"${e.trim()}"`).join(' ')
        : '';

      // Always quote location for exact matching, including "remote"
      let loc = ' "remote"';
      if (location && location !== 'remote') {
        loc = ` "${location}"`;
      }

      return `site:linkedin.com/jobs "${keywords}"${loc} (inurl:view OR inurl:jobs)${exclude}`;
    }
  },

  startups: {
    name: 'Startup Jobs',
    description: 'YC, AngelList, early-stage startups',
    icon: 'rocket',
    color: 'orange',
    category: 'companies',
    buildQuery: (keywords: string, exclusions: string, location?: string) => {
      const sites = [
        'site:ycombinator.com/companies',
        'site:workatastartup.com',
        'site:angel.co',
        'site:wellfound.com',
        'site:startupjobs.com',
        'site:startupjobs.asia',
        'site:eu-startups.com'
      ].join(' OR ');
      const exclude = exclusions.trim()
        ? ' ' + exclusions.split(',').map(e => `-"${e.trim()}"`).join(' ')
        : '';

      // Always quote location for exact matching, including "remote"
      let loc = ' "remote"';
      if (location && location !== 'remote') {
        loc = ` "${location}"`;
      }

      return `(${sites}) "${keywords}"${loc}${exclude}`;
    }
  },

  freelance: {
    name: 'Freelance/Contract',
    description: 'Contract, freelance opportunities',
    icon: 'briefcase',
    color: 'green',
    category: 'boards',
    buildQuery: (keywords: string, exclusions: string, location?: string) => {
      const sites = [
        'site:upwork.com',
        'site:freelancer.com',
        'site:toptal.com',
        'site:gun.io',
        'site:weworkremotely.com',
        'site:remoteok.io',
        'site:contra.com'
      ].join(' OR ');
      const exclude = exclusions.trim()
        ? ' ' + exclusions.split(',').map(e => `-"${e.trim()}"`).join(' ')
        : '';

      // Always quote location for exact matching
      let loc = '';
      if (location && location !== 'remote') {
        loc = ` "${location}"`;
      }

      return `(${sites}) "${keywords}" (freelance OR contract OR contractor)${loc}${exclude}`;
    }
  },

  web3: {
    name: 'Web3 & Crypto',
    description: 'Blockchain, crypto, Web3 jobs',
    icon: 'coins',
    color: 'yellow',
    category: 'boards',
    buildQuery: (keywords: string, exclusions: string, location?: string) => {
      const sites = [
        'site:crypto.jobs',
        'site:cryptocurrencyjobs.co',
        'site:web3.career',
        'site:cryptojobslist.com',
        'site:remote3.co',
        'site:usebraintrust.com'
      ].join(' OR ');
      const exclude = exclusions.trim()
        ? ' ' + exclusions.split(',').map(e => `-"${e.trim()}"`).join(' ')
        : '';

      // Always quote location for exact matching, including "remote"
      let loc = ' "remote"';
      if (location && location !== 'remote') {
        loc = ` "${location}"`;
      }

      return `(${sites}) "${keywords}"${loc}${exclude}`;
    }
  }
};

/**
 * Helper function to process keywords with boolean operators
 * Supports: AND, OR, quotes for exact match
 */
export function processKeywords(keywords: string): string {
  // If keywords already contain boolean operators, return as-is
  if (keywords.match(/\bAND\b|\bOR\b/i)) {
    return keywords;
  }

  // If keywords contain quotes, preserve them
  if (keywords.includes('"')) {
    return keywords;
  }

  // For simple keywords, wrap in quotes for exact match
  return `"${keywords}"`;
}

/**
 * Helper function to build exclusion query
 */
export function buildExclusionQuery(exclusions: string): string {
  if (!exclusions.trim()) return '';

  return ' ' + exclusions
    .split(',')
    .map(e => e.trim())
    .filter(e => e.length > 0)
    .map(e => {
      // If exclusion contains spaces, wrap in quotes
      return e.includes(' ') ? `-"${e}"` : `-${e}`;
    })
    .join(' ');
}

/**
 * Helper function to build location query
 */
export function buildLocationQuery(location?: string, defaultRemote: boolean = true): string {
  if (!location || location === 'remote') {
    return defaultRemote ? ' remote' : '';
  }

  // Always quote locations for exact matching
  return ` "${location}"`;
}

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
