import { checkPermission } from "@/lib/services/permission"
import { DataTable } from "@/components/table/data-table"
import NoReadPermission from "@/components/errors/no-read-permission"
import { UserColumns, UserSearchColumns } from "./_components/user-column"

export const metadata = {
  title: "Users",
}

export default async function UserPage() {
  const { read, write } = await checkPermission("user")
  if (!read) return <NoReadPermission />

  return (
    <DataTable
      name="user"
      write={write}
      columns={UserColumns}
      searchColumns={UserSearchColumns}
    />
  )
}
