import './env.mjs'
import NextIntl from 'next-intl/plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    // typedRoutes: true,
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  images: {
    domains: [
      'images.unsplash.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
    ],
  },
}

const withNextIntl = NextIntl('./src/lib/i18n.ts')

export default withNextIntl(nextConfig)
