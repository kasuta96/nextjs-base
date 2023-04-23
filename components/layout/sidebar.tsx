'use client'

import { sidebar, type Item } from '@/components/layout/sidebarData'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import clsx from 'clsx'
import { useState } from 'react'
import Nav from '@/components/layout/nav'
import { User } from '@/types/next-auth'

export function Sidebar({ user }: { user: User }) {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)

  return (
    <>
      <div className="fixed top-0 z-10 flex w-full flex-col border border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-300 lg:bottom-0 lg:z-auto lg:w-60">
        <div
          className={clsx('overflow-y-auto lg:static lg:block', {
            'fixed inset-x-0 bottom-0 top-0 mt-px bg-gray-50 dark:bg-gray-900':
              isOpen,
            hidden: !isOpen,
          })}
        >
          <div className="h-14 items-center px-4 py-4 lg:flex lg:h-auto">
            <Link
              href="/dashboard"
              className="group flex w-full items-center gap-x-2.5"
              onClick={close}
            >
              <h3 className="text-lg font-semibold tracking-wide">
                {process.env.APP_NAME}
              </h3>
            </Link>
          </div>

          <nav className="mb-20 space-y-6 overflow-y-scroll px-2 py-5">
            {sidebar.map((section) => {
              return (
                <div key={section.name}>
                  <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500/80">
                    <div>{section.name}</div>
                  </div>

                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <SidebarItem key={item.slug} item={item} close={close} />
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
        'flex space-x-2 rounded-md px-3 py-2 font-medium hover:bg-gray-200 dark:hover:bg-gray-800',
        {
          'font-semibold text-sky-700 dark:text-sky-300': isActive,
        }
      )}
    >
      <div className="h-6 w-6">{item.icon}</div>
      <span>{item.name}</span>
    </Link>
  )
}
