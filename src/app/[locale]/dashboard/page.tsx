import { useTranslations } from 'next-intl'
import Error from 'next/error'

export const metadata = {
  title: 'Dashboard',
}

export default function DashboardPage() {
  const t = useTranslations('common')

  return <div className="p-4">{t('Dashboard')}</div>
}
