/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://bissbox.com',
    generateRobotsTxt: true,
    exclude: [
      '/sitemap-catalog.xml',
      // '/sitemap-static.xml',
      '/account/add-business',
      '/account/add-business-finish',
      '/account/contact-info',
      '/account/favorites',
      '/account/inactive-businesses',
      '/account/my-businesses',
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
    transform: async (config, path) => {
      // only create changefreq along with path
      // returning partial properties will result in generation of XML field with only returned values.
      if (customLimitedField(path)) {
        // This returns `path` & `changefreq`. Hence it will result in the generation of XML field with `path` and  `changefreq` properties only.
        return {
          loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
          changefreq: 'weekly',
        }
      }
  
      // Use default transformation for all other cases
      return {
        loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
        changefreq: config.changefreq,
        priority: config.priority,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        alternateRefs: config.alternateRefs ?? [],
      }
    },
    robotsTxtOptions: {
      additionalSitemaps: [
        'https://bissbox.com/sitemap-catalog.xml',
        // 'https://bissbox.com/sitemap-static.xml',
      ],
    },
  }