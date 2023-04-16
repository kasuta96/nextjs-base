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
    <div className="flex h-screen flex-col justify-between">
      <header></header>
      <main className="mb-auto bg-gray-200 text-gray-700 dark:bg-gray-900 dark:text-gray-300">
        <div className="mb-16 lg:mb-2 lg:pl-60">
          <div className="max-w-8xl mx-auto space-y-8 px-2 py-4 lg:px-8">
            <div className="card">
              <AddressBar />
            </div>

            <div className="card">
              <div className="rounded-lg p-3.5 lg:p-6">{children}</div>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <Sidebar user={user} />
      </footer>
    </div>
  )
}
