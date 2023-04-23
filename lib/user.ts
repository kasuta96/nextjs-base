import { redirect } from 'next/navigation'
import { getCurrentUser } from './session'

export async function CheckUser(callbackUrl?: string) {
  const user = await getCurrentUser()
  if (!user) {
    return redirect(
      `/logout` +
        (callbackUrl ? `?from=${encodeURIComponent(callbackUrl)}` : '')
    )
  }

  if (['Inactive', 'Pending', 'Blocked'].includes(user.status))
    return redirect('/error/403')

  return user
}
