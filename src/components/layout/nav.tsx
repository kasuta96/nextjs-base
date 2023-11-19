"use client"

import { User } from "~/types/next-auth"
import { ThemeToggle } from "@/components/menu/theme-toggle"
import { Dispatch, SetStateAction } from "react"
import UserDropdown from "@/components/menu/user-dropdown"
import { Menu, X } from "lucide-react"

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
      className={`inset-x-0 bottom-0 rounded-t-3xl bg-white/60 px-5 py-3 text-gray-700 shadow-lg backdrop-blur-md dark:bg-gray-900/60 dark:text-gray-300 lg:rounded-none lg:border-t lg:border-gray-300 lg:bg-inherit lg:dark:border-gray-700 lg:dark:bg-inherit ${className}`}
    >
      <div className="flex justify-between space-x-4">
        <div className="flex items-center space-x-4">
          {setIsOpen && (
            <button
              type="button"
              className="p-1"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-8 w-8" />
              ) : (
                <Menu className="h-8 w-8" />
              )}
            </button>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <UserDropdown user={user} />
        </div>
      </div>
    </div>
  )
}
