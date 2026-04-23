import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.themealdb.com',
        pathname: '/images/media/meals/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/wikipedia/commons/**',
        search: '',
      },
    ],
    minimumCacheTTL: 2678400, // 31 days — meal images are immutable
  },
}

export default nextConfig
