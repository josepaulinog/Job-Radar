import { SearchStrategy, StrategyType } from './types';

export const strategies: Record<StrategyType, SearchStrategy> = {
  ats: {
    name: 'ATS X-Ray',
    description: 'Greenhouse, Lever, Workable, Ashby',
    icon: 'database',
    color: 'blue',
    buildQuery: (keywords: string, exclusions: string) => {
      const sites = [
        'site:greenhouse.io',
        'site:lever.co',
        'site:breezy.hr',
        'site:workable.com',
        'site:ashbyhq.com',
        'site:jobs.jobvite.com',
        'site:recruitee.com'
      ].join(' OR ');

      const exclude = exclusions.trim()
        ? ' ' + exclusions.split(',').map(e => `-"${e.trim()}"`).join(' ')
        : '';

      return `${sites} "${keywords}" remote${exclude}`;
    }
  },

  careers: {
    name: 'Career Pages',
    description: 'Direct company hiring pages',
    icon: 'briefcase',
    color: 'green',
    buildQuery: (keywords: string, exclusions: string) => {
      const exclude = exclusions.trim()
        ? ' ' + exclusions.split(',').map(e => `-"${e.trim()}"`).join(' ')
        : '';

      const excludeSites = [
        '-site:linkedin.com',
        '-site:indeed.com',
        '-site:glassdoor.com',
        '-site:ziprecruiter.com'
      ].join(' ');

      return `intitle:"careers" OR intitle:"jobs" OR intitle:"we're hiring" OR inurl:careers OR inurl:jobs "${keywords}" remote${exclude} ${excludeSites}`;
    }
  },

  community: {
    name: 'Communities',
    description: 'Reddit, HN, forums',
    icon: 'users',
    color: 'orange',
    buildQuery: (keywords: string, exclusions: string) => {
      const sites = [
        'site:reddit.com/r/forhire',
        'site:reddit.com/r/remotejobs',
        'site:news.ycombinator.com'
      ].join(' OR ');

      const exclude = exclusions.trim()
        ? ' ' + exclusions.split(',').map(e => `-"${e.trim()}"`).join(' ')
        : '';

      return `${sites} "hiring" OR "job" "${keywords}" remote${exclude}`;
    }
  },

  docs: {
    name: 'Documents',
    description: 'Public PDFs & job specs',
    icon: 'file-text',
    color: 'purple',
    buildQuery: (keywords: string, exclusions: string) => {
      const exclude = exclusions.trim()
        ? ' ' + exclusions.split(',').map(e => `-"${e.trim()}"`).join(' ')
        : '';

      return `filetype:pdf OR filetype:doc intitle:"job description" OR intitle:"job posting" OR intitle:"hiring" "${keywords}" remote${exclude}`;
    }
  }
};

export function getStrategyQuery(
  strategyType: StrategyType,
  keywords: string,
  exclusions: string
): string {
  const strategy = strategies[strategyType];
  return strategy.buildQuery(keywords, exclusions);
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
