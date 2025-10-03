/** @type {import('next-sitemap').IConfig} */
const sitemapConfig = {
  siteUrl: process.env.SITE_URL || "https://edu.galahub.tz",
  generateRobotsTxt: true,
  
  // Exclude patterns - need to match [locale] structure
  exclude: [
    "/*/admin*",           // Matches /en/admin, /sw/admin, etc.
    "/*/instructor*",      // Matches /en/instructor, /sw/instructor, etc.
    "/*/student*",         // Matches /en/student, /sw/student, etc.
    "/*/signin*",
    "/*/signup*",
    "/*/forgot-password*",
    "/*/activate-account*",
    "/404",
    "/500",
    "/_next/*",
    "/.next/*",
    "/api/*",
    "/static/*",
  ],
  
  // Define your supported locales
  additionalPaths: async (config) => {
    const locales = ['en', 'sw'];
    const defaultLocale = 'en';
    
    // Define all your public routes
    const publicRoutes = [
      { path: '/', priority: 1.0, changefreq: 'daily' },
      { path: '/about-us', priority: 0.8, changefreq: 'monthly' },
      { path: '/cookies-policy', priority: 0.3, changefreq: 'yearly' },
      { path: '/terms-and-privacy', priority: 0.3, changefreq: 'yearly' },
    ];
    
    const paths = [];
    
    for (const route of publicRoutes) {
      // Build alternate refs with ALL locales explicit in URL
      const alternateRefs = locales.map(l => ({
        href: `${config.siteUrl}/${l}${route.path}`,  // Always include locale: /en/about-us, /sw/about-us
        hreflang: l,
      }));
      
      // Add x-default WITHOUT locale prefix
      alternateRefs.push({
        href: `${config.siteUrl}${route.path}`,  // No locale: /about-us
        hreflang: 'x-default',
      });
      
      // Generate paths for each locale - ALL with explicit locale prefix
      for (const locale of locales) {
        paths.push({
          loc: `/${locale}${route.path}`,  // Always /en/... or /sw/...
          changefreq: route.changefreq,
          priority: route.priority,
          lastmod: new Date().toISOString(),
          alternateRefs: alternateRefs,
        });
      }
      
      // ALSO add the default path WITHOUT locale prefix (redirects to /en)
      if (route.path === '/') {
        paths.push({
          loc: '/',
          changefreq: 'daily',
          priority: 1.0,
          lastmod: new Date().toISOString(),
          alternateRefs: alternateRefs,
        });
      }
    }
    
    console.log(`📍 Generated ${paths.length} paths for ${locales.length} locales`);
    return paths;
  },
  
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/*/admin",
          "/*/instructor",
          "/*/student",
          "/*/signin",
          "/*/signup",
          "/*/gala-meet",
          "/*/forgot-password",
          "/_next",
          "/.next",
          "/api",
        ],
      },
    ],
  },
  
  generateIndexSitemap: false,
  outDir: "public",
  sitemapSize: 5000,
  changefreq: "daily",
  priority: 0.7,
};

export default sitemapConfig;