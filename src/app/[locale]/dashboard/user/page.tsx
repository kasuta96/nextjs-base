import { checkPermission } from '@/lib/services/permission'
import { getTranslations } from 'next-intl/server'

export const metadata = {
  title: 'Users',
}

export default async function UserPage() {
  const t = await getTranslations()

  const { read, write } = await checkPermission('user')
  if (!read) return <p>{t('notify.noReadPermission')}</p>

  return <p>{t(`common.Users`)}</p>
}
