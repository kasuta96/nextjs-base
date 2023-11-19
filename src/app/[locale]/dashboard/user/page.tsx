import { checkPermission } from "@/lib/services/permission"
import { DataTable } from "@/components/table/data-table"
import NoReadPermission from "@/components/errors/no-read-permission"
import { getUsers } from "@/lib/services/user"
import { UserColumns, UserSearchColumns } from "./_components/user-column"
import { User } from "@/lib/validations/user"

export const metadata = {
  title: "Users",
}

export default async function UserPage() {
  const { read, write } = await checkPermission("user")
  if (!read) return <NoReadPermission />

  const users = (await getUsers()) as unknown as User[]

  return (
    <DataTable
      name="user"
      write={write}
      columns={UserColumns}
      data={users}
      searchColumns={UserSearchColumns}
    />
  )
}
