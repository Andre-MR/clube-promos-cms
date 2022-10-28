/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [process.env.AWS_S3_DOMAIN],
    minimumCacheTTL: 0,
  },
};

module.exports = nextConfig;
