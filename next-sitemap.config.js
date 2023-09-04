/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://bissbox.com',
    generateRobotsTxt: true,
    exclude: [
      '/sitemap-catalog.xml',
      '/account/add-business',
      '/account/add-business-finish',
      '/account/contact-info',
      '/account/favorites',
      '/account/inactive-businesses',
      '/account/my-businesses',
    ],
    changefreq: 'weekly',
    robotsTxtOptions: {
      additionalSitemaps: [
        'https://bissbox.com/sitemap-catalog.xml',
      ],
    },
  }