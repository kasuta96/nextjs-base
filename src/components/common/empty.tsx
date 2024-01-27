"use client"

import * as React from "react"
import { SearchSlashIcon } from "lucide-react"
import { useTranslations } from "next-intl"

export const Empty = () => {
  const t = useTranslations()

  return (
    <div className="grid justify-items-center">
      <div className="flex items-center text-muted-foreground">
        <SearchSlashIcon className="mr-2 h-4 w-4" />
        {t("common.Empty")}
      </div>
    </div>
  )
}
