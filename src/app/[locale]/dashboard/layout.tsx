import { AddressBar } from "@/components/layout/address-bar"
import { Sidebar } from "@/components/layout/sidebar"
import { checkPermission } from "@/lib/services/permission"

export default async function DashboardLayout(props: {
  children: React.ReactNode
  userEditModal: React.ReactNode
}) {
  const { user } = await checkPermission()

  return (
    <div className="flex flex-col justify-start">
      <main className="lg:pl-60">
        <div className="max-w-8xl mx-auto mb-[72px] p-2 lg:mb-0 lg:px-8">
          <AddressBar />
          {props.children}
        </div>
      </main>
      <Sidebar user={user} />
    </div>
  )
}
