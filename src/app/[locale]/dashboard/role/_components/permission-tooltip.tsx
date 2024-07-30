"use client"

import { HelpCircle } from "lucide-react"

import { PermissionType } from "@/lib/validations/role"
import { useTranslations } from "next-intl"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function PermissionTooltip({
  permission,
}: {
  permission?: PermissionType
}) {
  const t = useTranslations()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <HelpCircle className="h-5 w-5" />
      </TooltipTrigger>
      <TooltipContent>{t(`permission.${permission?.remarks}`)}</TooltipContent>
    </Tooltip>
  )
}
