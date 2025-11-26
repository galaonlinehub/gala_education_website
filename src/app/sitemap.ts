import { MetadataRoute } from 'next';

const SITE_URL = 'https://edu.galahub.tz';
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

  return routes.map(({ path, changeFrequency, priority }) => {
    const canonicalUrl = `${SITE_URL}/${DEFAULT_LOCALE}${path === '/' ? '' : path}`;

    return {
      url: canonicalUrl,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          en: `${SITE_URL}/en${path === '/' ? '' : path}`,
          sw: `${SITE_URL}/sw${path === '/' ? '' : path}`,
          'x-default': canonicalUrl,
        },
      },
    };
  });
}