import { LucideIcon } from "lucide-react"
import { ClassNameValue } from "tailwind-merge"

export interface SearchParams {
  [key: string]: string | string[] | undefined
}

export interface Option {
  label: string
  value: string
  icon?: LucideIcon
  className?: ClassNameValue
  withCount?: boolean
}

interface BaseFilterField<TData> {
  label: string
  value: keyof TData
  placeholder?: string
}

export type DataTableFilterField<TData> =
  | (BaseFilterField<TData> & {
      type: "input" | "dateRange"
      // options?: never
    })
  | (BaseFilterField<TData> & {
      type: "select"
      options: Option[]
    })

export interface DataTableFilterOption<TData> {
  id: string
  label: string
  value: keyof TData
  options: Option[]
  filterValues?: string[]
  filterOperator?: string
  isMulti?: boolean
}
