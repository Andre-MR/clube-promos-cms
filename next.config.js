/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['clubepromos.s3.sa-east-1.amazonaws.com'],
    minimumCacheTTL: 0
  },
}

module.exports = nextConfig
