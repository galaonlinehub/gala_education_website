import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://edu.galahub.tz';
const LOCALES = ['en', 'sw'];
const PREFERRED_LOCALE = 'en';

const routes = [
  { path: '/', changefreq: 'daily', priority: 1.0 },
  { path: '/about-us', changefreq: 'weekly', priority: 0.7 },
  { path: '/cookies-policy', changefreq: 'weekly', priority: 0.7 },
  { path: '/terms-and-privacy', changefreq: 'weekly', priority: 0.7 },
  { path: '/signin', changefreq: 'monthly', priority: 0.8 },
  { path: '/signup/student', changefreq: 'monthly', priority: 0.9 },
  { path: '/signup/instructor', changefreq: 'monthly', priority: 0.9 },
];

function generateSitemap() {
  const lastmod = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

  routes.forEach(({ path: routePath, changefreq, priority }) => {
    const canonicalUrl = `${SITE_URL}/${PREFERRED_LOCALE}${routePath === '/' ? '' : routePath}`;

    xml += `  <url>
    <loc>${canonicalUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
`;

    // Add alternate language links
    LOCALES.forEach((locale) => {
      const localeUrl = `${SITE_URL}/${locale}${routePath === '/' ? '' : routePath}`;
      xml += `    <xhtml:link rel="alternate" hreflang="${locale}" href="${localeUrl}"/>\n`;
    });

    // Add x-default
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${canonicalUrl}"/>\n`;

    xml += `  </url>\n`;
  });

  xml += `</urlset>`;

  return xml;
}

function generateRobotsTxt() {
  return `# *
User-agent: *
Allow: /
Disallow: /admin
Disallow: /teacher
Disallow: /student
Disallow: /forgot-password
Disallow: /_next
Disallow: /.next
Disallow: /api
Disallow: /gala-meet

# Host
Host: ${SITE_URL}

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml
`;
}

// Generate and save files
const publicDir = path.join(process.cwd(), 'public');

// Generate sitemap
const sitemap = generateSitemap();
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
console.log('✅ Sitemap generated successfully');

// Generate robots.txt
const robotsTxt = generateRobotsTxt();
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
console.log('✅ robots.txt generated successfully');
