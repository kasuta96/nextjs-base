"use client"

import { useLocale } from "next-intl"
import NextLink from "next/link"
import { ComponentProps, forwardRef } from "react"
import { locales } from "@/lib/next-intl/config"
import { cn } from "@/lib/utils"

type Props = ComponentProps<typeof NextLink> & {
  onOpenChange?: (open: boolean) => void
}

export function removeLocaleFromUrl(url: string): string {
  const regex = new RegExp(`^/(${locales.join("|")})([\/])?([\?])?`)
  return url.replace(regex, "/$3")
}

function Link(
  { href, locale, className, onOpenChange, ...rest }: Props,
  ref: Props["ref"]
) {
  const currentLocale = useLocale()

  // Turn this off, to avoid updating the locale cookie for prefetch requests
  // const prefetch = false

  function getLocalizedHref(originalHref: string) {
    let url = removeLocaleFromUrl(originalHref)

    return url.replace(
      /^\//,
      "/" + (typeof locale === "string" ? locale : currentLocale) + "/"
    )
  }

  const localizedHref =
    typeof href === "string"
      ? getLocalizedHref(href)
      : href.pathname != null
        ? { ...href, pathname: getLocalizedHref(href.pathname) }
        : href

  return (
    <NextLink
      ref={ref}
      href={localizedHref}
      className={cn(className)}
      onClick={() => onOpenChange?.(false)}
      {...rest}
    />
  )
}

export default forwardRef(Link)
