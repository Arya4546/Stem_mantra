/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: process.env.SITE_URL || 'https://www.stemmantra.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: [
    '/api/*',
    '/admin',
    '/admin/*',
    '/dashboard',
    '/dashboard/*',
    '/settings',
    '/profile',
    '/login',
    '/register',
    '/forgot-password'
  ],
  transform: async (config, path) => {
    let priority = 0.7;
    let changefreq = 'monthly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'weekly';
    } else if (path.startsWith('/programs') || path.startsWith('/services')) {
      priority = 0.9;
      changefreq = 'monthly';
    } else if (path.includes('atl-lab') || path.includes('robotics-lab') || path.includes('stem-lab')) {
      priority = 0.8;
      changefreq = 'monthly';
    } else if (path === '/privacy-policy' || path === '/terms-of-service' || path === '/refund-policy') {
      priority = 0.3;
      changefreq = 'yearly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
          '/settings',
          '/profile',
          '/login',
          '/register',
          '/forgot-password'
        ],
      },
    ],
    additionalSitemaps: [
      'https://www.stemmantra.com/sitemap.xml',
    ],
  },
};
