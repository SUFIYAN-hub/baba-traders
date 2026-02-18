/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable experimental features that might conflict
  experimental: {
    optimizeCss: false,
  },
}

module.exports = nextConfig