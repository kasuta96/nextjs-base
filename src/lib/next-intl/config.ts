import { Pathnames } from "next-intl/navigation"

export const locales = ["en", "ja", "vi"]

export const pathnames = {
  "/": "/",
  "/pathnames": {
    en: "/en",
    ja: "/ja",
    vi: "/vi",
  },
} satisfies Pathnames<typeof locales>

// Use the default: `always`
export const localePrefix = undefined

export type AppPathnames = keyof typeof pathnames
