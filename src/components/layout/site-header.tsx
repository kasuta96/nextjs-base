"use client"

import { ThemeToggle } from "@/components/menu/theme-toggle"
import UserDropdown from "@/components/menu/user-dropdown"
import { SessionUser } from "~/types/next-auth"
import { MainNav } from "./main-nav"
import { MobileNav } from "./mobile-nav"

export function SiteHeader({ user }: { user?: SessionUser }) {
  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 container sticky top-0 z-50 flex h-14 w-full items-center border-b backdrop-blur">
      <MobileNav user={user} />
      <MainNav />
      <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
        <div className="w-full flex-1 md:w-auto md:flex-none"></div>
        <nav className="flex items-center">
          <ThemeToggle />
          <UserDropdown user={user} />
        </nav>
      </div>
    </header>
  )
}
