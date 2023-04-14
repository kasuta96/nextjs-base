'use client'

import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import {
  ArchiveBoxIcon,
  ArrowRightIcon,
  Cog6ToothIcon,
  DocumentArrowUpIcon,
  PencilIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import { User } from '@/types/next-auth'
import { signOut } from 'next-auth/react'

export default function UserDropDown({ user }: { user: User }) {
  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button>
            <Image
              className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
              src={user.image || '/media/avatar.png'}
              width="40"
              height="40"
              alt=""
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute -top-2 right-0 w-52 origin-top-right -translate-y-full transform divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="flex items-center space-x-2 p-4">
              <Image
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
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
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <Cog6ToothIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Setting
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={(event) => {
                      event.preventDefault()
                      signOut({
                        callbackUrl: `${window.location.origin}/login`,
                      })
                    }}
                  >
                    <ArrowRightIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Sign Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
