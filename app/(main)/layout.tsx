import { AddressBar } from '@/components/layout/address-bar'
import { GlobalNav } from '@/components/layout/global-nav'
import Byline from '@/components/navigation/byline'
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
    <main className="h-screen overflow-y-scroll bg-gray-50 dark:bg-gray-950">
      <GlobalNav user={user} />

      <div className="lg:pl-60 xl:pl-72">
        <div className="max-w-8xl mx-auto space-y-8 px-2 pt-14 lg:px-8 lg:py-4">
          <div className="bg-vc-border-gradient rounded-lg p-px shadow-lg dark:shadow-black/20">
            <div className="rounded-lg dark:bg-black">
              <AddressBar />
            </div>
          </div>

          <div className="bg-vc-border-gradient rounded-lg p-px shadow-lg dark:shadow-black/20">
            <div className="rounded-lg p-3.5 lg:p-6">{children}</div>
          </div>
        </div>
      </div>
      <Byline className="absolute lg:hidden" user={user} />
    </main>
  )
}
