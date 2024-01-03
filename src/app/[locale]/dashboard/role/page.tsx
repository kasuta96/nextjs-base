import { getRoleIncludePermissions } from "@/lib/services/role"
import { RoleAccordion } from "./_components/role-accordion"
import { checkPermission } from "@/lib/services/permission"
import NoReadPermission from "@/components/errors/no-read-permission"

export const metadata = {
  title: "Role",
}

export default async function UserPage() {
  // Check permission
  const { read, write } = await checkPermission("role")
  if (!read) return <NoReadPermission />

  const roles = await getRoleIncludePermissions()

  return <RoleAccordion roles={roles} write={write} />
}
