import { MetadataRoute } from 'next';

const SITE_URL = 'https://edu.galahub.tz';
const LOCALES = ['en', 'sw'] as const;
const DEFAULT_LOCALE = 'en';

type Route = {
  path: string;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'always' | 'hourly' | 'yearly' | 'never';
  priority: number;
};

const routes: Route[] = [
  { path: '/', changeFrequency: 'daily', priority: 1.0 },
  { path: '/about-us', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/cookies-policy', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/terms-and-privacy', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/signin', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/signup/student', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/signup/instructor', changeFrequency: 'monthly', priority: 0.9 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const sitemapEntries: MetadataRoute.Sitemap = [];

  routes.forEach(({ path, changeFrequency, priority }) => {
    // Create entries for each locale
    LOCALES.forEach((locale) => {
      const url = `${SITE_URL}/${locale}${path === '/' ? '' : path}`;
      
      sitemapEntries.push({
        url,
        lastModified,
        changeFrequency,
        priority,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((loc) => [
              loc,
              `${SITE_URL}/${loc}${path === '/' ? '' : path}`,
            ])
          ),
        },
      });
    });
  });

  return sitemapEntries;
}