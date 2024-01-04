import { useTranslations } from "next-intl"
import React from "react"

export default function NoReadPermission() {
  const t = useTranslations()
  return <p className="text-center">{t("notify.noReadPermission")}</p>
}
