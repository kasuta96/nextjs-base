import { AddressBar } from '@/components/layout/address-bar'
import { Sidebar } from '@/components/layout/sidebar'
import { CheckActiveUser } from '@/lib/user'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await CheckActiveUser()

  return (
    <div className="flex h-screen flex-col justify-between">
      <header></header>
      <main className="mb-auto">
        <div className="mb-16 lg:mb-2 lg:pl-60">
          <div className="max-w-8xl mx-auto space-y-8 px-2 py-4 lg:px-8">
            <div className="card">
              <AddressBar />
            </div>

            <div>{children}</div>
          </div>
        </div>
      </main>
      <footer>
        <Sidebar user={user} />
      </footer>
    </div>
  )
}
