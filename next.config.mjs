/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['.'],
  },
  basePath: '',
  poweredByHeader: false,
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
}

export default nextConfig
