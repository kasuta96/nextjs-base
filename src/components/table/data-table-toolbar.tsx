'use client'

import { Table } from '@tanstack/react-table'
import { DataTableViewOptions } from '@/components/table/data-table-view-options'
import { DataTableSearch, SearchColumnProps } from './data-table-search'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  name: string
  searchColumns?: SearchColumnProps[]
}

export function DataTableToolbar<TData>({
  table,
  name,
  searchColumns,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex justify-between">
      <div className="overflow-x-auto p-2 pb-4">
        {searchColumns?.length && (
          <DataTableSearch name={name} table={table} columns={searchColumns} />
        )}
      </div>
      <div className="p-2 pr-0">
        <DataTableViewOptions name={name} table={table} />
      </div>
    </div>
  )
}
