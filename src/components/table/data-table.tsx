"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { DataTableToolbar } from "./data-table-toolbar"
import { DataTablePagination } from "./data-table-pagination"
import { useMemo, useState } from "react"
import { useTranslations } from "next-intl"
import { SearchColumnProps } from "./data-table-search"
import { Loader2 } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  name: string
  searchColumns?: SearchColumnProps[]
  write?: boolean
}

export async function fetchUsers(options: {
  pageIndex: number
  pageSize: number
}) {
  console.log("start fetUsers")

  const { pageIndex, pageSize } = options
  const query = `page=${pageIndex}&size=${pageSize}`
  try {
    const res = await fetch(`/api/user?${query}`)
    if (!res?.ok) {
      throw new Error(`Failed to fetch users: ${res.statusText}`)
    }
    const data = await res.json()
    console.log(data)

    return data
  } catch (error) {
    console.error("Failed to fetch users:", error)
    throw new Error("Failed to fetch users")
  }
}

export function DataTable<TData, TValue>({
  columns,
  name, // use for namespace
  searchColumns,
  write,
}: DataTableProps<TData, TValue>) {
  console.log("Start DataTable")

  const t = useTranslations()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const dataQuery = useQuery({
    queryKey: ["data", pagination],
    queryFn: () => fetchUsers(pagination),
    placeholderData: keepPreviousData, // don't have 0 rows flash while changing pages/loading next page
  })
  const defaultData = useMemo(() => [], [])

  const table = useReactTable({
    data: dataQuery.data?.rows ?? defaultData,
    columns,
    rowCount: dataQuery.data?.rowCount,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    // getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    meta: {
      permission: {
        write: write,
      },
    },
    debugTable: true,
  })

  return (
    <div className="space-y-2">
      <DataTableToolbar
        name={name}
        table={table}
        searchColumns={searchColumns}
      />
      <div className="relative rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={`${header.column.columnDef?.meta?.headerClass}`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="bg-background"
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell
                        key={cell.id}
                        className={`${cell.column.columnDef?.meta?.cellClass}`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {!dataQuery.isFetching && t("notify.noResults")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <DataTablePagination table={table} loading={dataQuery.isFetching} />
        {dataQuery.isFetching && (
          <div className="absolute left-1/2 top-2/4 -translate-x-1/2 -translate-y-1/2">
            <Loader2 className="mr-2 h-10 w-10 animate-spin" />
          </div>
        )}
      </div>
    </div>
  )
}

export function DataTableSkeleton() {
  let columns = [1, 2, 3, 4]
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={columns.length}>
              <Skeleton className="h-5 w-full" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {columns.map((c, i) => (
            <TableRow key={i}>
              {columns.map((c, i) => (
                <TableCell key={i}>
                  <Skeleton className={`h-5 w-full`} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
