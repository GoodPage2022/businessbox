// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// }

// module.exports = nextConfig

const withReactSvg = require('next-react-svg')
const path = require('path')

const env = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  jwtSecret: process.env.JWT_SECRET,
  cockpitApiUrl: process.env.API_URL,
  cockpitApiToken: process.env.API_TOKEN,
  cockpitBaseUrl: process.env.BASE_URL,
  digiSpaceAccessKeyId: process.env.DIGI_SPACE_ACCESSS_KEY_ID,
  digiSpaceSecretAccessKey: process.env.DIGI_SPACE_SECRET_ACCESSS_KEY,
  digiSpaceEndpoint: process.env.DIGI_SPACE_ENDPOINT,
  emailjsServiceId: process.env.EMAILJS_SERVISE_ID,
  emailjsTemplateId: process.env.EMAILJS_TEMPLATE_ID,
  emailjsTemplateId2: process.env.EMAILJS_TEMPLATE_ID2,
  emailjsUserId: process.env.EMAILJS_USER_ID,
  emailjsAccessToken: process.env.EMAILJS_ACCESS_TOKEN,
}

module.exports = withReactSvg({
  env,
  images: {
    domains: ['157.230.99.45', 'localhost', "daydrive.fra1.digitaloceanspaces.com"]
  },
  include: path.resolve(__dirname, 'src/assets/svg'),
  webpack(config, options) {
    return config
  },
})