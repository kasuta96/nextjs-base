import { PermissionIdType } from '@/lib/constants/permission'
import { activeUserStatus } from '@/lib/constants/auth'
import { redirect } from 'next/navigation'
import { ROUTE_403, ROUTE_LOGOUT } from '@/lib/constants/route'
import { getCurrentUser } from '@/lib/session'

export async function checkPermission(permissionId?: PermissionIdType) {
  const user = await getCurrentUser()
  if (!user) {
    return redirect(ROUTE_LOGOUT)
  }

  // Check user status
  if (!activeUserStatus.includes(user.status)) return redirect(ROUTE_403)

  // If check user only
  if (!permissionId) return { user: user }

  // Role admin: full access
  if (user.role === 'ADMIN') {
    return { read: true, write: true, user: user }
  }

  // Check permission
  return {
    read: user.allPermission.read.includes(permissionId),
    write: user.allPermission.write.includes(permissionId),
    user: user,
  }
}
