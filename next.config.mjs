import "./env.mjs"
import NextIntl from "next-intl/plugin"

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // appDir: true,
    // typedRoutes: true,
    serverComponentsExternalPackages: ["@prisma/client"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "**.githubusercontent.com",
      },
    ],
  },
}

const withNextIntl = NextIntl("./src/lib/next-intl/i18n.ts")

export default withNextIntl(nextConfig)
