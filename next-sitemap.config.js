/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://pictools.one',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: './public',
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
