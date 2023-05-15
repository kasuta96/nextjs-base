import { useTranslations } from 'next-intl'

export const metadata = {
  title: 'Setting',
}

export default function SettingPage() {
  const t = useTranslations('common')

  return <p>{t(`Setting`)}</p>
}
