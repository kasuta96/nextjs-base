import { useTranslations } from "next-intl"

export const metadata = {
  title: "Dashboard",
}

export default function DashboardPage() {
  const t = useTranslations("common")

  return <div className="p-4">{t("Dashboard")}</div>
}
