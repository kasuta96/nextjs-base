import { Inter } from 'next/font/google'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { getCurrentUser } from '@/lib/session'

const inter = Inter({ subsets: ['latin'] })

export default async function Home() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login')
  } else {
    redirect('/dashboard')
  }
}
