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

export const genders = enumToOptions(Gender)

export const userStatus = enumToOptions(UserStatus)

export const status = enumToOptions(Status)

/**
 * Returns the appropriate status icon based on the provided status.
 * @param status - The status.
 * @returns A React component representing the status icon.
 */
export function getStatusIcon(status: Option["label"]) {
  const statusIcons: { [key: string]: LucideIcon } = {
    Active: ShieldCheckIcon,
    Inactive: ShieldQuestionIcon,
    Blocked: ShieldOffIcon,
  }

  return statusIcons[status] || ShieldIcon
}
