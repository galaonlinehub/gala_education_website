import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/teacher',
          '/student',
          '/forgot-password',
          '/_next',
          '/.next',
          '/api',
          '/gala-meet',
        ],
      },
    ],
    sitemap: 'https://edu.galahub.tz/sitemap.xml',
  };
}