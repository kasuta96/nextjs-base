import { getServerSession as getSS } from 'next-auth/next'
import auth from '@/lib/auth'

export async function getServerSession() {
  return await getSS(auth)
}

export async function getCurrentUser() {
  const session = await getServerSession()

  return session?.user
}
