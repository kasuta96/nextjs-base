"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { ROUTE_DASHBOARD, ROUTE_HOME } from "@/lib/constants/route"
import { env } from "~/env.mjs"
import { useTranslations } from "next-intl"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const t = useTranslations("common")

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <div className="flex items-center lg:h-auto">
        <Link href={ROUTE_HOME} className="text-lg font-semibold tracking-wide">
          {env.NEXT_PUBLIC_APP_NAME}
        </Link>
      </div>
      <div className="hidden md:block">
        <Link
          href={ROUTE_DASHBOARD}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          {t(`Dashboard`)}
        </Link>
      </div>
    </nav>
  )
}
