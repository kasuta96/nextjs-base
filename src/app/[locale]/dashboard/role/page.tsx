import { getRoleIncludePermissions } from '@/lib/services/role'
import { RoleAccordion } from './_components/role-accordion'
import { checkPermission } from '@/lib/services/permission'
import { getTranslations } from 'next-intl/server'

export const metadata = {
  title: 'Role',
}

export default async function UserPage() {
  const t = await getTranslations()
  // Check permission
  const { read, write } = await checkPermission('role')
  if (!read) return <p>{t('notify.noReadPermission')}</p>

  const roles = await getRoleIncludePermissions()

  return <RoleAccordion roles={roles} write={write} />
}
