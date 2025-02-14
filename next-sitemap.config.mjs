/** @type {import('next-sitemap').IConfig} */
const sitemapConfig = {
  siteUrl: "https://edu.galahub.org",
  generateRobotsTxt: true,
  exclude: [
    "/admin/*",
    "/teacher/*",
    "/student/*",
    "/signin",
    "/signup",
    "/forgot-password",
    "/404",
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
        ],
      },
    ],
  },
  generateIndexSitemap: false,
  outDir: "public",
};

export default sitemapConfig;
