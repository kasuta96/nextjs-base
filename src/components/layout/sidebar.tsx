"use client"

import { SidebarData, type Item } from "./sidebar-data"
import Link, { removeLocaleFromUrl } from "@/components/common/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { SessionUser } from "~/types/next-auth"
import { useTranslations } from "next-intl"

export function Sidebar({
  user,
  setOpen,
}: {
  user?: SessionUser
  setOpen?: (open: boolean) => void
}) {
  const t = useTranslations("common")
  const sidebar = user ? SidebarData(user) : null

  return (
    <div className="grid grid-flow-row auto-rows-max text-sm">
      {sidebar?.map((section) => {
        return (
          <div key={section.name}>
            <div className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <div>{t(section.name)}</div>
            </div>

            {section.items.map((item) => (
              <SidebarItem
                key={item.path}
                item={item}
                t={t}
                setOpen={setOpen}
              />
            ))}
          </div>
        )
      })}
    </div>
  )
}

function SidebarItem({
  item,
  t,
  setOpen,
}: {
  item: Item
  t: any
  setOpen?: (open: boolean) => void
}) {
  const pathname = usePathname()
  const isActive = item.path === removeLocaleFromUrl(pathname)

  return (
    <Link
      href={`${item.path}`}
      className={clsx(
        "flex space-x-2 rounded-md px-3 py-2 text-sm hover:bg-sky-foreground",
        {
          "font-semibold text-sky": isActive,
        }
      )}
      onOpenChange={setOpen}
    >
      <div className="flex h-5 w-5 items-center">{item.icon}</div>
      <span>{t(item.name)}</span>
    </Link>
  )
}
