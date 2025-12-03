import { MetadataRoute } from 'next';
import { getAllPostSlugs } from '@/lib/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://jobradar.app';

    // Static pages with their priorities and update frequencies
    const staticPages = [
        { route: '', changeFreq: 'daily' as const, priority: 1.0 },
        { route: '/blog', changeFreq: 'daily' as const, priority: 0.9 },
        { route: '/about', changeFreq: 'monthly' as const, priority: 0.8 },
        { route: '/favorites', changeFreq: 'weekly' as const, priority: 0.7 },
        { route: '/setup', changeFreq: 'monthly' as const, priority: 0.8 },
        { route: '/how-it-works', changeFreq: 'monthly' as const, priority: 0.8 },
        { route: '/privacy', changeFreq: 'yearly' as const, priority: 0.5 },
        { route: '/terms', changeFreq: 'yearly' as const, priority: 0.5 },
    ];

    const routes = staticPages.map(({ route, changeFreq, priority }) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: changeFreq,
        priority,
    }));

    // Add blog posts dynamically
    const postSlugs = getAllPostSlugs();
    const blogPosts = postSlugs.map((slug) => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [...routes, ...blogPosts];
}
