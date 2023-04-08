import { notFound } from 'next/navigation'
import { getCurrentUser } from '@/lib/session'

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center">
        <div>
          {user.name} ({user.email})
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}
