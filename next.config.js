/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ['localhost', 'vercel.app', 'netlify.app'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // PWA and performance optimizations
  compress: true,
  poweredByHeader: false,
  swcMinify: true,
}

module.exports = nextConfig