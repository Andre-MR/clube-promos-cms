/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [process.env.AMAZON_S3_DOMAIN],
    minimumCacheTTL: 0,
  },
};

module.exports = nextConfig;
