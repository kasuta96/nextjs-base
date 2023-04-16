'use client'

import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export default function Dropdown({
  btn,
  header,
  menu,
}: {
  btn?: JSX.Element
  header?: JSX.Element
  menu?: {
    className?: string
    data: Array<{
      icon?: any
      name: string
      onClick?: any
    }>
  }
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="flex justify-center">
        <Menu.Button>
          {btn ? (
            btn
          ) : (
            <div className="inline-block h-8 w-8 rounded-full ring-2 ring-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
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
        <Menu.Items
          className={`absolute z-30 max-w-sm origin-top-right divide-y divide-gray-200 rounded-md bg-gray-50 text-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:ring-gray-700 ${menu?.className}`}
        >
          {header && header}
          {menu && (
            <div className="px-1 py-1">
              {menu.data.map((item, i) => {
                return (
                  <Menu.Item key={i}>
                    {({ active }) => (
                      <div
                        className={` group flex w-full cursor-pointer items-center rounded-md px-4 py-2 ${
                          active && 'bg-cyan-700 text-white'
                        }`}
                        onClick={item.onClick}
                      >
                        {item.icon && <div className="mr-2">{item.icon}</div>}
                        {item.name}
                      </div>
                    )}
                  </Menu.Item>
                )
              })}
            </div>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
