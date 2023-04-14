'use client'

import { User } from '@/types/next-auth'
import UserDropDown from './userDropdown'

export default function Byline({
  className,
  user,
}: {
  className: string
  user: User
}) {
  return (
    <div className={`${className} inset-x-0 bottom-3 rounded-lg`}>
      <div className="flex justify-end space-x-2 border-t-2 p-3.5">
        <UserDropDown user={user} />
      </div>
    </div>
  )
}
