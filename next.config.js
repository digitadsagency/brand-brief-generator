/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'vercel.app'],
  },
  experimental: {
    serverComponentsExternalPackages: ['@react-pdf/renderer']
  }
}

module.exports = nextConfig
