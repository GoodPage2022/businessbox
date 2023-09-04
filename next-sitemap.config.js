/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://bissbox.com',
    generateRobotsTxt: true,
    exclude: [
      '/sitemap-0.xml',
      '/sitemap-catalog.xml',
      '/sitemap-static.xml',
    ],
    // additionalPaths: async (config) => {
    //   const result = []
  
    //   result.push({ loc: '/' })
    //   result.push({ loc: '/catalog' })
    //   result.push({ loc: '/invest' })
    //   result.push({ loc: '/invest/catalog' })
    //   result.push({ loc: '/useful-information' })
    //   result.push({ loc: '/information/privacy-policy' })
    //   result.push({ loc: '/information/public-offer' })
    //   result.push({ loc: '/information/delivery-payment' })
    //   result.push({ loc: '/information/about-us' })

    //   return result
    // },
    robotsTxtOptions: {
      additionalSitemaps: [
        'https://bissbox.com/sitemap-catalog.xml',
        'https://bissbox.com/sitemap-static.xml',
      ],
    },
  }