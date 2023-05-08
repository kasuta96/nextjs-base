import { useTranslations } from 'next-intl'

export const metadata = {
  title: 'Users',
}

export default function UserPage() {
  const t = useTranslations('common')

  return <p>{t(`Users`)}</p>
}
