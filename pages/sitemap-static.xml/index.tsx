// pages/server-sitemap.xml/index.tsx
import { ISitemapField, getServerSideSitemapLegacy,  } from 'next-sitemap'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    let urls:ISitemapField[] = []
    urls.push({ loc: 'https://bissbox.com/catalog/' })
    urls.push({ loc: 'https://bissbox.com/catalog/catalog' })
    urls.push({ loc: 'https://bissbox.com/catalog/invest' })
    urls.push({ loc: 'https://bissbox.com/catalog/invest/catalog' })
    urls.push({ loc: 'https://bissbox.com/catalog/useful-information' })
    urls.push({ loc: 'https://bissbox.com/catalog/information/privacy-policy' })
    urls.push({ loc: 'https://bissbox.com/catalog/information/public-offer' })
    urls.push({ loc: 'https://bissbox.com/catalog/information/delivery-payment' })
    urls.push({ loc: 'https://bissbox.com/catalog/information/about-us' })

    return getServerSideSitemapLegacy(ctx, urls)
}

// Default export to prevent next.js errors
export default function Sitemap() {}