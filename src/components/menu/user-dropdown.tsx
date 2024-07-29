"use client"

import { SessionUser } from "~/types/next-auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Languages, LogIn, ShieldCheck } from "lucide-react"
import Link from "@/components/common/link"
import { locales } from "@/lib/next-intl/config"
import { useMounted } from "@/lib/hooks/use-mounted"
import { useTranslations } from "next-intl"
import { usePathname, useSearchParams } from "next/navigation"
import { userDropdownData as menu } from "./user-dropdown-data"
import { ROUTE_DEFAULT_AVATAR, ROUTE_LOGIN } from "@/lib/constants/route"

function UserDropdown({ user }: { user?: SessionUser }) {
  const mounted = useMounted()
  const t = useTranslations("common")
  const pathname = usePathname()
  const searchParamsStr = useSearchParams().toString()

  if (!mounted) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Image
          className="m-0.5 inline-block h-8 w-8 rounded-full p-0.5 ring-1 ring-gray-300 dark:ring-gray-500"
          src={user?.image || ROUTE_DEFAULT_AVATAR}
          width="40"
          height="40"
          alt=""
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        {user && (
          <>
            <DropdownMenuLabel>
              <div className="flex items-start space-x-2">
                <Image
                  className="inline-block h-10 w-10 rounded-full"
                  src={user.image || ROUTE_DEFAULT_AVATAR}
                  width="40"
                  height="40"
                  alt={user.name ?? ""}
                />
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs font-light">{user.email}</div>
                </div>
              </div>
              <span className="text-xs font-light">
                {user.systemRole == "ADMIN" ? (
                  <div className="flex items-center space-x-2 pt-3">
                    <ShieldCheck className="h-5 w-5" />
                    <span>SYSTEM ADMIN</span>
                  </div>
                ) : user.userRoles.length ? (
                  <div className="flex items-center space-x-2 pt-3">
                    <ShieldCheck className="h-5 w-5 flex-none" />
                    <span>
                      {user.userRoles?.map((r) => r.role.name).join(", ")}
                    </span>
                  </div>
                ) : (
                  <></>
                )}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Languages className="mr-2 h-5 w-5" />
              <span>{t("Languages")}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {locales.map((locale) => (
                  <Link
                    href={pathname + (searchParamsStr && `?${searchParamsStr}`)}
                    locale={locale}
                    key={locale}
                  >
                    <DropdownMenuItem className="cursor-pointer">
                      <span className="w-8 font-medium uppercase opacity-70">
                        {locale}
                      </span>
                      <span>{t(`lang-${locale}`)}</span>
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          {user ? (
            menu.map((subMenu, index) => (
              <span key={index}>
                <DropdownMenuSeparator />
                {subMenu.map((item) => (
                  <Link href={item.path} key={item.path}>
                    <DropdownMenuItem className="cursor-pointer">
                      {item.icon}
                      <span>{t(item.name)}</span>
                    </DropdownMenuItem>
                  </Link>
                ))}
              </span>
            ))
          ) : (
            <>
              <DropdownMenuSeparator />
              <Link href={ROUTE_LOGIN}>
                <DropdownMenuItem>
                  <LogIn className="mr-2 h-5 w-5" />
                  <span>{t("Login")}</span>
                </DropdownMenuItem>
              </Link>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdown
