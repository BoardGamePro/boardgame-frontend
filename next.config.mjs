import createNextIntlPlugin from 'next-intl/plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['s.tesera.ru', 'cf.geekdo-images.com'],
  },
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
