// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// }

// module.exports = nextConfig

const path = require("path");

const env = {
  liqpayClientId: process.env.LIQPAY_CLIENT_ID,
  liqpayClientSecret: process.env.LIQPAY_CLIENT_SECRET,
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  jwtSecret: process.env.JWT_SECRET,
  cockpitApiUrl: process.env.API_URL,
  cockpitApiToken: process.env.API_TOKEN,
  baseUrl: process.env.BASE_URL,
  digiSpaceAccessKeyId: process.env.DIGI_SPACE_ACCESSS_KEY_ID,
  digiSpaceSecretAccessKey: process.env.DIGI_SPACE_SECRET_ACCESSS_KEY,
  digiSpaceEndpoint: process.env.DIGI_SPACE_ENDPOINT,
  emailjsServiceId: process.env.EMAILJS_SERVISE_ID,
  emailjsTemplateId: process.env.EMAILJS_TEMPLATE_ID,
  emailjsTemplateId2: process.env.EMAILJS_TEMPLATE_ID2,
  emailjsUserId: process.env.EMAILJS_USER_ID,
  emailjsAccessToken: process.env.EMAILJS_ACCESS_TOKEN,
  sendpulseUserId: process.env.SENDPULSE_USER_ID,
  sendpulseSecret: process.env.SENDPULSE_SECRET,
  sendpulseTokenStorage: process.env.SENDPULSE_TOKEN_STORAGE,
  sendpulseTemplateId1: process.env.SENDPULSE_TEMPLATE_ID1,
  sendpulseTemplateId2: process.env.SENDPULSE_TEMPLATE_ID2,
  sendpulseTemplateId3: process.env.SENDPULSE_TEMPLATE_ID3,
  sendpulseTemplateId4: process.env.SENDPULSE_TEMPLATE_ID4,
  sendpulseTemplateId5: process.env.SENDPULSE_TEMPLATE_ID5,
  sendpulseSubject1: process.env.SENDPULSE_SUBJECT1,
  sendpulseSubject2: process.env.SENDPULSE_SUBJECT2,
  nextPublicFacebookPixelId: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID,
};

const nextReactSvgConfig = {
  include: path.resolve(__dirname, "src/assets/svg"),
};

const withReactSvg = require("next-react-svg")(nextReactSvgConfig);

const nextConfig = {
  reactStrictMode: false,
  env,
  images: {
    domains: [
      "admin.bissbox.com",
      "157.230.99.45",
      "localhost",
      "daydrive.fra1.digitaloceanspaces.com",
    ],
    unoptimized: process.env.UNOPTIMIZED == "true" ? true : false,
  },
  include: path.resolve(__dirname, "src/assets/svg"),
  webpack(config, options) {
    return config;
  },
};

module.exports = withReactSvg(nextConfig);
