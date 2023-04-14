'use client'

import { sidebar, type Item } from '@/lib/data/sidebar'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useState } from 'react'
import Byline from '@/components/navigation/byline'
import { User } from '@/types/next-auth'

export function GlobalNav({ user }: { user: User }) {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)

  return (
    <div className="fixed top-0 z-10 flex w-full flex-col border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950 lg:bottom-0 lg:z-auto lg:w-60 lg:border-b-0 lg:border-r lg:border-gray-200 dark:lg:border-gray-800 xl:w-72">
      <div className="flex h-14 items-center px-4 py-4 lg:h-auto">
        <Link
          href="/dashboard"
          className="group flex w-full items-center gap-x-2.5"
          onClick={close}
        >
          <h3 className="font-semibold tracking-wide">
            {process.env.APP_NAME}
          </h3>
        </Link>
      </div>
      <button
        type="button"
        className="group absolute right-0 top-0 flex h-14 items-center gap-x-2 px-4 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="font-medium text-gray-100 group-hover:text-gray-400">
          Menu
        </div>
        {isOpen ? (
          <XMarkIcon className="block w-6 text-gray-400" />
        ) : (
          <Bars3Icon className="block w-6 text-gray-400" />
        )}
      </button>

      <div
        className={clsx('overflow-y-auto lg:static lg:block', {
          'fixed inset-x-0 bottom-0 top-14 mt-px bg-white dark:bg-black':
            isOpen,
          hidden: !isOpen,
        })}
      >
        <nav className="space-y-6 px-2 py-5">
          {sidebar.map((section) => {
            return (
              <div key={section.name}>
                <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500/80">
                  <div>{section.name}</div>
                </div>

                <div className="space-y-1">
                  {section.items.map((item) => (
                    <GlobalNavItem key={item.slug} item={item} close={close} />
                  ))}
                </div>
              </div>
            )
          })}
        </nav>
        <Byline className="absolute hidden lg:block" user={user} />
      </div>
    </div>
  )
}

function GlobalNavItem({
  item,
  close,
}: {
  item: Item
  close: () => false | void
}) {
  const segment = useSelectedLayoutSegment()
  const isActive = item.slug === segment

  return (
    <Link
      onClick={close}
      href={`/${item.slug}`}
      className={clsx(
        'block rounded-md px-3 py-2 text-sm font-medium hover:text-gray-700 dark:hover:text-gray-300',
        {
          'text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800':
            !isActive,
          ' bg-blue-100 dark:bg-blue-900': isActive,
        }
      )}
    >
      {item.name}
    </Link>
  )
}
