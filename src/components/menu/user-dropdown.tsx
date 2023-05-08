'use client'

import { User } from '~/types/next-auth'
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
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import { Languages, LogIn } from 'lucide-react'
import Link from '@/components/Link'
import { locales } from '@/lib/i18n'
import { useMounted } from '@/lib/hook/use-mounted'
import { useTranslations } from 'next-intl'
import { usePathname, useSearchParams } from 'next/navigation'
import { userDropdownData as menu } from './user-dropdown-data'
import { ROUTE_DEFAULT_AVATAR, ROUTE_LOGIN } from '@/lib/constants/route'

function UserDropdown({ user }: { user?: User }) {
  const mounted = useMounted()
  const t = useTranslations('common')
  const pathname = usePathname()
  const searchParamsStr = useSearchParams().toString()

  if (!mounted) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Image
          className="m-0.5 inline-block h-10 w-10 rounded-full p-0.5 ring-1 ring-gray-300 dark:ring-gray-500"
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
                  alt={user.name ?? ''}
                />
                <div>
                  <div className="font-medium">{user.name}</div>
                  <span className="text-xs opacity-70">🚀 {user.role}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Languages className="mr-2 h-5 w-5" />
              <span>{t('Languages')}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {locales.map((locale) => (
                  <Link
                    href={pathname + (searchParamsStr && `?${searchParamsStr}`)}
                    locale={locale}
                    key={locale}
                  >
                    <DropdownMenuItem className="cursor-pointer text-popover-foreground">
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
                  <span>{t('Login')}</span>
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
