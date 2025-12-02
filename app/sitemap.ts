import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://jobradar.app';

    // Static pages
    const routes = ['', '/about', '/blog', '/setup', '/how-it-works', '/privacy', '/terms'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: route === '' || route === '/blog' ? 'daily' as const : 'weekly' as const,
        priority: route === '' ? 1.0 : route === '/blog' ? 0.9 : 0.8,
    }));

    // TODO: Add blog post URLs dynamically when blog posts are fetched
    // This would require reading blog files and creating entries for each post

    return routes;
}
