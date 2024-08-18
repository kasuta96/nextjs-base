"use client"

import * as React from "react"
import type { DataTableFilterField } from "~/types"
import { XIcon } from "lucide-react"
import type { Table } from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { DateRangePicker } from "./date-range-picker"

interface DataTableToolbarProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>
  filterFields?: DataTableFilterField<TData>[]
  locale: string
}

export function DataTableToolbar<TData>({
  table,
  filterFields = [],
  children,
  className,
  locale,
  ...props
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div
      className={cn(
        "flex w-full items-center justify-between space-x-2 overflow-auto p-1",
        className
      )}
      {...props}
    >
      <div className="flex flex-1 items-center space-x-2">
        {filterFields.map((field) => {
          const column = table.getColumn(String(field.value) || "")
          if (!column) return null

          switch (field.type) {
            case "input":
              return (
                <Input
                  key={String(field.value)}
                  placeholder={field.placeholder}
                  value={(column.getFilterValue() as string) ?? ""}
                  onChange={(event) =>
                    column.setFilterValue(event.target.value)
                  }
                  className="h-8 w-40 xl:w-64"
                />
              )

            case "select":
              return (
                <DataTableFacetedFilter
                  key={String(field.value)}
                  column={column}
                  title={field.label}
                  options={field.options ?? []}
                />
              )

            case "dateRange":
              return (
                <DateRangePicker
                  key={String(field.value)}
                  column={column}
                  triggerSize="sm"
                  align="end"
                  paramName={String(field.value)}
                  title={field.label}
                  locale={locale}
                />
              )

            default:
              return null
          }
        })}

        {isFiltered && (
          <Button
            aria-label="Reset filters"
            variant="ghost"
            className="h-8 px-2 lg:px-3"
            onClick={() => table.resetColumnFilters()}
          >
            Reset
            <XIcon className="ml-2 size-4" aria-hidden="true" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        {children}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
