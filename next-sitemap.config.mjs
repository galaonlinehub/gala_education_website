/** @type {import('next-sitemap').IConfig} */
const sitemapConfig = {
  siteUrl: "https://edu.galahub.tz",
  generateRobotsTxt: true,
  exclude: [
    "/admin/*",
    "/teacher/*",
    "/student/*",
    "/signin",
    "/signup",
    "/forgot-password",
    "/404",
    "/_next/*",
    "/.next/*",
    "/api/*",
    "/static/*",
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/teacher",
          "/student",
          "/signin",
          "/signup",
          "/forgot-password",
          "/_next",
          "/.next",
          "/api",
        ],
      },
    ],
  },
  generateIndexSitemap: false, // set to true if site grows
  outDir: "public",
  sitemapSize: 5000,
  changefreq: "daily",
  priority: 0.7,
};

export default sitemapConfig;
