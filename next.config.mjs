import createNextIntlPlugin from 'next-intl/plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's.tesera.ru',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cf.geekdo-images.com',
        pathname: '**',
      },
    ],
  },

  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
      encoding: false,
    }

    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false,
      encoding: false,
    }
    return config
  },
  turbopack: {
    resolveAlias: {
      canvas: './empty-module.js',
      encoding: './empty-module.js',
    },
  },
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)