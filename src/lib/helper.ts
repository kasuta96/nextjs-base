import { Account } from "@prisma/client"
import { LucideIcon } from "lucide-react"
import { User } from "./validations/user"

// Create prisma select object from zod schema
export function createSelect(schema: any): object {
  const select: any = {}

  for (const key in schema.shape) {
    select[key] = true
  }

  return select
}

// Create an options from prisma enums
export interface Option {
  label: string
  value: string
  icon?: LucideIcon
}

export function enumToOptions<T extends Record<string, string>>(
  enumType: T
): Option[] {
  const options: Option[] = []

  for (const key in enumType) {
    if (Object.prototype.hasOwnProperty.call(enumType, key)) {
      const value = enumType[key]
      options.push({
        label: key,
        value: value,
      })
    }
  }

  return options
}

export function getAccountType(accounts?: Account[]): string {
  const result = accounts?.length
    ? accounts
        .map((a) => {
          let type = a.type == "oauth" ? "SSO" : a.type
          let provider = a.provider
          return `${type} (${provider})`
        })
        .join(", ")
    : ""

  return result
}

export function isEmptyObject(obj: object) {
  return !Object.keys(obj).length
}

export type BooleanRecord = Record<string, boolean>

export function convertToIdsObj(obj: BooleanRecord): { id: string }[] {
  return Object.keys(obj)
    .filter((key) => obj[key])
    .map((key) => ({ id: key }))
}

export function convertToBooleanRecord(arr: User["userRoles"]): BooleanRecord {
  return arr.reduce((acc, userRole) => {
    acc[userRole.role.id] = true
    return acc
  }, {} as BooleanRecord)
}

export const getDirtyValues = <
  DirtyFields extends Record<string, unknown>,
  Values extends Record<keyof DirtyFields, unknown>,
>(
  dirtyFields: DirtyFields,
  values: Values
): Partial<typeof values> => {
  const dirtyValues = Object.keys(dirtyFields).reduce((prev, key) => {
    if (!dirtyFields[key]) return prev

    return {
      ...prev,
      [key]:
        typeof dirtyFields[key] === "object"
          ? getDirtyValues(
              dirtyFields[key] as DirtyFields,
              values[key] as Values
            )
          : values[key],
    }
  }, {})

  return dirtyValues
}
