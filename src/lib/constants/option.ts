import { Gender, UserStatus, Status } from "@prisma/client"
import { enumToOptions } from "../helper"
import {
  LucideIcon,
  ShieldCheckIcon,
  ShieldIcon,
  ShieldOffIcon,
  ShieldQuestionIcon,
} from "lucide-react"
import { Option } from "~/types"
import { ClassNameValue } from "tailwind-merge"

export const genders = enumToOptions(Gender)

export const userStatus = enumToOptions(UserStatus)

export const status = enumToOptions(Status)

/**
 * Returns the appropriate status icon based on the provided status.
 * @param status - The status.
 * @returns A React component representing the status icon.
 */
export function getStatusIconX(status: Option["label"]) {
  const statusIcons: { [key: string]: LucideIcon } = {
    Active: ShieldCheckIcon,
    Inactive: ShieldQuestionIcon,
    Blocked: ShieldOffIcon,
  }

  return statusIcons[status] || ShieldIcon
}

export function getStatusIcon(status: Option["label"]) {
  const statusIcons: {
    [key: string]: { icon: LucideIcon; className: ClassNameValue }
  } = {
    Active: { icon: ShieldCheckIcon, className: "text-green-foreground" },
    Inactive: { icon: ShieldQuestionIcon, className: "text-muted-foreground" },
    Blocked: { icon: ShieldOffIcon, className: "text-destructive-foreground" },
  }

  const defaultIcon = {
    icon: ShieldIcon,
    className: "",
  }
  return statusIcons[status] || defaultIcon
}
