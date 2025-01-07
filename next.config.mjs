/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['.'],
  },
  basePath: '',
  poweredByHeader: false,
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    GHN_BASE_URL: process.env.GHN_BASE_URL,
    GHN_TOKEN_API: process.env.GHN_TOKEN_API,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}

export default nextConfig
