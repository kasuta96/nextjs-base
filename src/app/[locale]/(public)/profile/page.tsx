import { ProfileForm } from './_components/profile-form'
import { getUnblockUser, getUserData } from '@/lib/user'
import { notFound } from 'next/navigation'

export const metadata = {
  title: 'Profile',
}

export default async function ProfilePage() {
  const sessionUser = await getUnblockUser()
  const user = await getUserData(sessionUser.id)

  if (!user) {
    notFound()
  }

  return <ProfileForm user={user} />
}
