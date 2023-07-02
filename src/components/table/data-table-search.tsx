'use client'

import { Table } from '@tanstack/react-table'
import { Input } from '@/components/ui/input'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { Option } from '@/lib/helper'
import { useTranslations } from 'next-intl'
import { Button } from '../ui/button'
import { X } from 'lucide-react'

export interface SearchColumnProps {
  id: string
  type: 'text' | 'option'
  options?: Option[]
  isFilter?: boolean
}

interface DataTableSearchProps<TData> {
  table: Table<TData>
  name: string
  columns: SearchColumnProps[]
}

export function DataTableSearch<TData>({
  table,
  name,
  columns,
}: DataTableSearchProps<TData>) {
  const t = useTranslations()
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex flex-1 items-center space-x-2">
      {columns.map(
        (column, index) =>
          column.isFilter !== false && (
            <div key={index}>
              {column.type == 'text' ? (
                <Input
                  placeholder={t(`${name}.${column.id}`)}
                  value={
                    (table.getColumn(column.id)?.getFilterValue() as string) ??
                    ''
                  }
                  onChange={(event) => {
                    table
                      .getColumn(column.id)
                      ?.setFilterValue(event.target.value)
                  }}
                  className="h-8 w-[100px] lg:w-[120px] xl:w-[150px]"
                />
              ) : column.type == 'option' && column.options ? (
                <DataTableFacetedFilter
                  name={name}
                  column={table.getColumn(column.id)}
                  title={column.id}
                  options={column.options}
                />
              ) : (
                <></>
              )}
            </div>
          )
      )}
      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => table.resetColumnFilters()}
          className="h-8 whitespace-nowrap px-2 lg:px-3"
        >
          <X className="mr-2 h-4 w-4" />
          {t('common.Reset')}
        </Button>
      )}
    </div>
  )
}
