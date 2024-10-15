module.exports = {
    siteUrl: process.env.SITE_URL | 'https://example.com',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    exclude: ['/api/*'],
    changefreq: 'daily',
    priority: 0.7,
  };
  