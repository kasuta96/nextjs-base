import { User as UserType } from '@/types/next-auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import { LogOut, Settings, User } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

function UserDropdown({ user }: { user: UserType }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Image
          className="m-0.5 inline-block h-10 w-10 rounded-full p-0.5 ring-1 ring-gray-300 dark:ring-gray-500"
          src={user.image || '/media/avatar.png'}
          width="40"
          height="40"
          alt=""
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuLabel>
          <div className="flex items-start space-x-2">
            <Image
              className="inline-block h-10 w-10 rounded-full"
              src={user.image || '/media/avatar.png'}
              width="40"
              height="40"
              alt={user.name ?? ''}
            />
            <div>
              <div className="text-sm font-medium">{user.name}</div>
              <span className="text-xs opacity-70">🚀 {user.role}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-5 w-5" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/setting">
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-5 w-5" />
              <span>Settings</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={(e: { preventDefault: () => void }) => {
              e.preventDefault()
              signOut({
                callbackUrl: `${window.location.origin}/login`,
              })
            }}
          >
            <LogOut className="mr-2 h-5 w-5" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdown
