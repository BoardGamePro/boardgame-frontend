import createNextIntlPlugin from 'next-intl/plugin'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        canvas: resolve(__dirname, 'empty-module.js'),
        encoding: resolve(__dirname, 'empty-module.js'),
      }
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
