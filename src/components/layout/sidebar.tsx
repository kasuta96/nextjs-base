"use client"

import { SidebarData, type Item } from "./sidebar-data"
import Link, { removeLocaleFromUrl } from "@/components/Link"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { useState } from "react"
import Nav from "@/components/layout/nav"
import { SessionUser } from "~/types/next-auth"
import { env } from "~/env.mjs"
import { useTranslations } from "next-intl"
import { ROUTE_HOME } from "@/lib/constants/route"

export function Sidebar({ user }: { user: SessionUser }) {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)
  const t = useTranslations("common")
  const sidebar = SidebarData(user)

  return (
    <>
      <div className="fixed top-0 z-10 flex w-full flex-col border border-gray-300 text-gray-700 lg:bottom-0 lg:z-auto lg:w-60 dark:border-gray-700 dark:text-gray-300">
        <div
          className={clsx("overflow-y-auto lg:static lg:block", {
            "fixed inset-x-0 bottom-0 top-0 mt-px bg-gray-50 dark:bg-gray-900":
              isOpen,
            hidden: !isOpen,
          })}
        >
          <div className="h-14 items-center px-4 py-4 lg:flex lg:h-auto">
            <Link
              href={ROUTE_HOME}
              className="group flex w-full items-center gap-x-2.5"
              onClick={close}
            >
              <h3 className="text-lg font-semibold tracking-wide">
                {env.NEXT_PUBLIC_APP_NAME}
              </h3>
            </Link>
          </div>

          <nav className="mb-20 space-y-6 overflow-y-scroll px-2 py-5">
            {sidebar.map((section) => {
              return (
                <div key={section.name}>
                  <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <div>{t(section.name)}</div>
                  </div>

                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <SidebarItem
                        key={item.path}
                        item={item}
                        close={close}
                        t={t}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </nav>
          <Nav className="absolute hidden lg:block" user={user} />
        </div>
      </div>
      <Nav
        className="fixed z-50 pb-4 lg:hidden"
        user={user}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  )
}

function SidebarItem({
  item,
  close,
  t,
}: {
  item: Item
  close: () => false | void
  t: any
}) {
  const pathname = usePathname()
  const isActive = item.path === removeLocaleFromUrl(pathname)

  return (
    <Link
      onClick={close}
      href={`${item.path}`}
      className={clsx(
        "flex space-x-2 rounded-md px-3 py-2 text-sm hover:bg-sky-foreground",
        {
          "font-semibold text-sky": isActive,
        }
      )}
    >
      <div className="flex h-5 w-5 items-center">{item.icon}</div>
      <span>{t(item.name)}</span>
    </Link>
  )
}
