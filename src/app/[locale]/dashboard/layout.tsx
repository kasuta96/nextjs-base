import { AddressBar } from "@/components/layout/address-bar"
import { Sidebar } from "@/components/layout/sidebar"
import { checkPermission } from "@/lib/services/permission"
import { ScrollArea } from "@/components/ui/scroll-area"

export default async function DashboardLayout(props: {
  children: React.ReactNode
}) {
  const { user } = await checkPermission()

  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[150px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[180px_minmax(0,1fr)]">
      <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
        <ScrollArea className="h-full pb-6 pr-4 pt-4">
          <Sidebar user={user} />
        </ScrollArea>
      </aside>
      <main className="relative py-4">
        <div className="mx-auto w-full min-w-0">
          <AddressBar />
          {props.children}
        </div>
      </main>
    </div>
  )
}
