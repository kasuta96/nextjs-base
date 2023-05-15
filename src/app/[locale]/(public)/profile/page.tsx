import { ProfileForm } from './_components/profile-form'
import { getUnblockUser } from '@/lib/user'
import { notFound } from 'next/navigation'
import { ProfileType } from '@/lib/validations/user'
import { env } from '~/env.mjs'

export const metadata = {
  title: 'Profile',
}

export default async function ProfilePage() {
  const sessionUser = await getUnblockUser()
  const res = await fetch(
    `${env.NEXT_PUBLIC_APP_URL}/api/users/${sessionUser.id}`
  )
  const user = (await res.json()) as ProfileType

  if (!res.ok) {
    throw "Can't get user data"
  }

  if (!user) {
    notFound()
  }

  return <ProfileForm user={user} />
}
