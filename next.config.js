// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// }

// module.exports = nextConfig

const withReactSvg = require('next-react-svg')
const path = require('path')

const env = {
  cockpitApiUrl: process.env.API_URL,
  cockpitApiToken: process.env.API_TOKEN,
  cockpitBaseUrl: process.env.BASE_URL
}

module.exports = withReactSvg({
  env,
  include: path.resolve(__dirname, 'src/assets/svg'),
  webpack(config, options) {
    return config
  },
})