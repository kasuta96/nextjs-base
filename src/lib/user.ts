import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/session'
import { activeUserStatus } from '@/lib/constants/auth'
import { ROUTE_403, ROUTE_LOGIN, ROUTE_LOGOUT } from '@/lib/constants/route'
import { db } from '@/lib/db'
import { User } from '@prisma/client'

export async function getActiveUser() {
  const user = await getCurrentUser()
  if (!user) {
    return redirect(ROUTE_LOGOUT)
  }

  if (activeUserStatus.includes(user.status)) return user

  return redirect(ROUTE_403)
}

export async function getUnblockUser() {
  const user = await getCurrentUser()
  if (!user) {
    return redirect(ROUTE_LOGIN)
  }
  return user
}

export async function getUserData(userId: User['id']) {
  return await db.user.findFirst({
    where: {
      id: userId,
    },
  })
}
