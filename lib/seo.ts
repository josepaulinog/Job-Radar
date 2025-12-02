// SEO configuration for JobRadar

export const siteConfig = {
  name: 'JobRadar',
  title: 'JobRadar — Find Remote Jobs on ATS Platforms | Hidden Job Opportunities',
  description: 'Discover remote job opportunities hidden on company ATS platforms. Search Greenhouse, Lever, Workable, and 50+ hiring systems. 100% free job search tool.',
  url: 'https://jobradar.app',
  ogImage: 'https://jobradar.app/og-image.png',
  creator: '@josepaulinog',
  keywords: [
    'remote jobs',
    'ATS jobs',
    'Greenhouse jobs',
    'Lever jobs',
    'hidden job opportunities',
    'job search tool',
    'remote work',
    'work from home',
    'job hunting',
    'career search',
    'tech jobs',
    'developer jobs',
    'Google Custom Search jobs',
    'company career pages',
    'direct apply jobs'
  ],
  author: {
    name: 'Jose Paulino',
    url: 'https://josepaulino.com',
    twitter: '@josepaulinog'
  }
};

export const pages = {
  home: {
    title: 'JobRadar — Find Remote Jobs on ATS Platforms',
    description: 'Discover remote job opportunities hidden on company ATS platforms. Search Greenhouse, Lever, Workable, and 50+ hiring systems.',
    path: '/',
  },
  about: {
    title: 'About JobRadar — Mission & Story',
    description: 'Learn about JobRadar\'s mission to help job seekers find hidden opportunities by searching directly on company ATS platforms.',
    path: '/about',
  },
  setup: {
    title: 'Setup Guide — Get Started with JobRadar',
    description: 'Step-by-step guide to configure your Google API credentials and start finding remote jobs on ATS platforms.',
    path: '/setup',
  },
  howItWorks: {
    title: 'How It Works — JobRadar Search Technology',
    description: 'Understand how JobRadar uses advanced Google search operators to find jobs directly on company hiring platforms.',
    path: '/how-it-works',
  },
  blog: {
    title: 'Job Search Tips & Remote Work Insights — JobRadar Blog',
    description: 'Expert tips on remote job hunting, ATS optimization, resume writing, and navigating the modern job market.',
    path: '/blog',
  },
  privacy: {
    title: 'Privacy Policy — JobRadar',
    description: 'Learn how JobRadar protects your data and privacy while helping you find remote job opportunities.',
    path: '/privacy',
  },
  terms: {
    title: 'Terms of Service — JobRadar',
    description: 'Terms and conditions for using JobRadar job search platform.',
    path: '/terms',
  }
};

// Generate structured data for rich snippets
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    founder: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.author.url
    },
    sameAs: [
      siteConfig.author.url
    ]
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image || siteConfig.ogImage,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: article.author,
      url: siteConfig.author.url
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`
      }
    }
  };
}

// Helper function to generate page metadata
export function generatePageMetadata(pageKey: keyof typeof pages) {
  const page = pages[pageKey];
  return {
    title: page.title,
    description: page.description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
    creator: siteConfig.creator,
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${siteConfig.url}${page.path}`,
      siteName: siteConfig.name,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      creator: siteConfig.creator,
    },
  };
}
