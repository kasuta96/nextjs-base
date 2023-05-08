import ThemeSwitch from '@/components/menu/theme-switch'
import UserDropdown from '@/components/menu/user-dropdown'
import { env } from '~/env.mjs'
import Link from '@/components/Link'
import { ROUTE_HOME } from '@/lib/constants/route'
import { getCurrentUser } from '@/lib/session'

interface HomeLayoutProps {
  children: React.ReactNode
}

export default async function HomeLayout({ children }: HomeLayoutProps) {
  const user = await getCurrentUser()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 lg:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <Link
          href={ROUTE_HOME}
          className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
        >
          {env.NEXT_PUBLIC_APP_NAME}
        </Link>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center space-x-4 bg-gradient-to-t from-white via-white p-2 dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <ThemeSwitch />
          <UserDropdown user={user} />
        </div>
      </div>

      {children}
    </main>
  )
}
