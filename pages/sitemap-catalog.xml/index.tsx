// pages/server-sitemap.xml/index.tsx
import { ISitemapField, getServerSideSitemapLegacy,  } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import axios from 'axios';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const response = await axios.post(`${process.env.baseUrl}/api/businesses/getList`, { user: null });

  console.log(Object.keys(response.data));
  
  let urls:ISitemapField[] = []
  for (var _e of response.data.entries) {
    urls.push({
      loc: 'https://bissbox.com/catalog/' + _e._id,
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    })
  }

  return getServerSideSitemapLegacy(ctx, urls)
}

// Default export to prevent next.js errors
export default function Sitemap() {}