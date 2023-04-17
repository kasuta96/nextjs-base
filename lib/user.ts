import { redirect } from 'next/navigation'
import { getCurrentUser } from './session'

export async function CheckUser() {
  const user = await getCurrentUser()
  if (!user) return redirect('/login')

  if (['Inactive', 'Pending', 'Blocked'].includes(user.status))
    redirect('error/403')

  return user
}
