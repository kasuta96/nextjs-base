import { AddressBar } from '@/components/layout/addressBar'
import { Sidebar } from '@/components/layout/sidebar'
import { getCurrentUser } from '@/lib/session'
import { notFound } from 'next/navigation'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  return (
    <main className="h-screen overflow-y-scroll bg-gray-200 text-gray-700 dark:bg-gray-900 dark:text-gray-300">
      <div className="lg:pl-60 xl:pl-72">
        <div className="max-w-8xl mx-auto space-y-8 px-2 py-4 lg:px-8">
          <div className="card">
            <AddressBar />
          </div>

          <div className="card">
            <div className="rounded-lg p-3.5 lg:p-6">{children}</div>
          </div>
        </div>
      </div>
      <Sidebar user={user} />
    </main>
  )
}
