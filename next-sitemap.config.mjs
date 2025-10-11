/** @type {import('next-sitemap').IConfig} */
const sitemapConfig = {
  siteUrl: 'https://edu.galahub.tz',
  generateRobotsTxt: true,
  exclude: [
    '/admin/*',
    '/teacher/*',
    '/student/*',
    '/forgot-password',
    '/404',
    '/not-found',
    '/gala-meet',
    '/_next/*',
    '/.next/*',
    '/api/*',
    '/static/*',
    '/sitemap.xml',
    '/robots.txt',
    '/sw/*',
    '/en/*',
  ],
  robotsTxtOptions: {
    policies: [
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
  },
  generateIndexSitemap: false,
  outDir: 'public',
  sitemapSize: 5000,

  additionalPaths: async (config) => {
    const staticRoutes = [
      '/',
      '/about-us',
      '/cookies-policy',
      '/terms-and-privacy',
      '/signin',
      '/signup/student',
      '/signup/instructor',
    ];

    const result = [];
    
    for (const route of staticRoutes) {
      let priority = 0.7;
      let changefreq = 'weekly';
      
      if (route === '/') {
        priority = 1.0;
        changefreq = 'daily';
      } else if (route === '/signup/student' || route === '/signup/instructor') {
        priority = 0.9;
        changefreq = 'monthly';
      } else if (route === '/signin') {
        priority = 0.8;
        changefreq = 'monthly';
      }

      const enUrl = `${config.siteUrl}/en${route === '/' ? '' : route}`;
      const swUrl = `${config.siteUrl}/sw${route === '/' ? '' : route}`;
      
      const alternateRefs = [
        {
          hreflang: 'en',
          href: enUrl,
        },
        {
          hreflang: 'sw',
          href: swUrl,
        },
        {
          hreflang: 'x-default',
          href: enUrl,
        },
      ];

      // DEBUG: Log what we're generating
      console.log(`Route: ${route}`);
      console.log('alternateRefs:', JSON.stringify(alternateRefs, null, 2));

      const entry = {
        loc: enUrl,
        changefreq: changefreq,
        priority: priority,
        lastmod: new Date().toISOString(),
        alternateRefs: alternateRefs,
      };

      result.push(entry);
    }
    
    console.log('\nFinal result:', JSON.stringify(result, null, 2));
    return result;
  },
};

export default sitemapConfig;