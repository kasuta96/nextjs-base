import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/session'
import { activeUserStatus } from '@/lib/constants/auth'
import { ROUTE_403, ROUTE_LOGIN, ROUTE_LOGOUT } from '@/lib/constants/route'

export async function CheckActiveUser() {
  const user = await getCurrentUser()
  if (!user) {
    return redirect(ROUTE_LOGOUT)
  }

  if (activeUserStatus.includes(user.status)) return user

  return redirect(ROUTE_403)
}

export async function checkBlock() {
  const user = await getCurrentUser()
  if (!user) {
    return redirect(ROUTE_LOGIN)
  }
  return user
}
