/** @type {import('next-sitemap').IConfig} */
const sitemapConfig = {
  siteUrl: "https://edu.galahub.tz",
  generateRobotsTxt: true,
  exclude: [
    // Your existing exclusions
    "/admin/*",
    "/teacher/*",
    "/student/*",
    "/signin",
    "/signup",
    "/forgot-password",
    "/404",
    // Add these to fix the ENOENT error with app router
    "/_next/*",
    "/.next/*",
    "/api/*",
    "/static/*",
    // Exclude any other build artifacts
    "/sitemap.xml",
    "/robots.txt",
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
          // Add these to match the sitemap exclusions
          "/_next",
          "/.next",
          "/api",
        ],
      },
    ],
  },
  generateIndexSitemap: false,
  outDir: "public",
  // Add these options to handle app router better
  sitemapSize: 5000, // Limit size to avoid memory issues
  changefreq: "daily",
  priority: 0.7,
  // Skip problematic paths during generation
  additionalPaths: async (config) => {
    // Return empty array to skip automatic path detection issues
    return [];
  },
};

export default sitemapConfig;