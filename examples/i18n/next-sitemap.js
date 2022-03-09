/** @type {import('next-sitemap').IConfig} */

const siteUrl = process.env.SITE_URL || 'https://example.com'

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  // optional
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://example.com/my-custom-sitemap-1.xml',
      'https://example.com/my-custom-sitemap-2.xml',
      'https://example.com/my-custom-sitemap-3.xml',
    ],
  },
}
