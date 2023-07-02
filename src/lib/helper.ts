import { LucideIcon } from 'lucide-react'

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
