import { getRoles } from '@/lib/services/role'
import { RoleAccordion } from './_components/role-accordion'

export const metadata = {
  title: 'Role',
}

export default async function UserPage() {
  const roles = await getRoles()

  return <RoleAccordion roles={roles} />
}
