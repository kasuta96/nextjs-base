import { useTranslations } from 'next-intl'

export const metadata = {
  title: 'Profile',
}

export default function ProfilePage() {
  const t = useTranslations('common')

  return <p>{t(`Profile`)}</p>
}
