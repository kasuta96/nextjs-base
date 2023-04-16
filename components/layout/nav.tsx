'use client'

import { User } from '@/types/next-auth'
import ThemeSwitch from '@/components/navigation/themeSwitch'
import Dropdown from '@/components/basic/dropdown'
import Image from 'next/image'
import {
  ArrowRightIcon,
  Bars3Icon,
  Cog6ToothIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { signOut } from 'next-auth/react'
import { Dispatch, SetStateAction } from 'react'

export default function Nav({
  className,
  user,
  isOpen,
  setIsOpen,
}: {
  className: string
  user: User
  isOpen?: boolean
  setIsOpen?: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <div
      className={`inset-x-0 bottom-0 rounded-t-3xl bg-gray-50 px-5 py-3 text-gray-700 shadow-lg dark:bg-gray-700 dark:text-gray-300 lg:rounded-none lg:border-t lg:border-gray-300 lg:bg-inherit lg:dark:border-gray-700 lg:dark:bg-inherit ${className}`}
    >
      <div className="flex justify-between space-x-4">
        <div className="flex items-center space-x-4">
          {setIsOpen && (
            <button
              type="button"
              className="px-2 py-1"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <XMarkIcon className="w-8" />
              ) : (
                <Bars3Icon className="w-8" />
              )}
            </button>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <ThemeSwitch />
          <UserDropdown user={user} />
        </div>
      </div>
    </div>
  )
}

function UserDropdown({ user }: { user: User }) {
  return (
    <Dropdown
      btn={
        <Image
          className="m-0.5 inline-block h-10 w-10 rounded-full p-0.5 ring-1 ring-gray-300 dark:ring-gray-500"
          src={user.image || '/media/avatar.png'}
          width="40"
          height="40"
          alt=""
        />
      }
      header={
        <div className="flex items-start space-x-2 p-4">
          <Image
            className="inline-block h-10 w-10 rounded-full"
            src={user.image || '/media/avatar.png'}
            width="40"
            height="40"
            alt=""
          />
          <div>
            <div className="text-sm font-medium">{user.name}</div>
            <span className="text-500 text text-xs">🚀 {user.role}</span>
          </div>
        </div>
      }
      menu={{
        className: '-top-2 right-0 -translate-y-full w-52',
        data: [
          {
            name: 'Setting',
            icon: <Cog6ToothIcon className="mr-2 h-5 w-5" aria-hidden="true" />,
          },
          {
            name: 'Sign Out',
            icon: (
              <ArrowRightIcon className="mr-2 h-5 w-5" aria-hidden="true" />
            ),
            onClick: (e: { preventDefault: () => void }) => {
              e.preventDefault()
              signOut({
                callbackUrl: `${window.location.origin}/login`,
              })
            },
          },
        ],
      }}
    />
  )
}
