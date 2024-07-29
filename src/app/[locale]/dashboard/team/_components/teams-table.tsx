"use client"
"use memo"

import * as React from "react"
import { type DataTableFilterField } from "~/types"

import { useDataTable } from "@/lib/hooks/use-data-table"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"

import { getColumns } from "./teams-table-columns"
import { TeamsTableFloatingBar } from "./teams-table-floating-bar"
import { TeamsTableToolbarActions } from "./teams-table-toolbar-actions"
import { Team } from "@prisma/client"
import { getStatusIcon, status } from "@/lib/constants/option"
import { type getTeams } from "@/lib/services/team"

interface TeamsTableProps {
  teamsPromise: ReturnType<typeof getTeams>
}

export function TeamsTable({ teamsPromise }: TeamsTableProps) {
  // Feature flags for showcasing some additional features. Feel free to remove them.
  const useFloatingBar = true

  const { data, pageCount } = React.use(teamsPromise)

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo(() => getColumns(), [])

  const filterFields: DataTableFilterField<Team>[] = [
    {
      label: "Title",
      value: "name",
      placeholder: "Filter titles...",
    },
    {
      label: "Description",
      value: "description",
      placeholder: "Filter descriptions...",
    },
    {
      label: "Status",
      value: "status",
      options: status.map((s) => ({
        label: s.label.toUpperCase(),
        value: s.label,
        icon: getStatusIcon(s.label),
      })),
    },
  ]

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    /* optional props */
    filterFields,
    state: {
      sorting: [{ id: "createdAt", desc: true }],
      pagination: { pageIndex: 0, pageSize: 10 },
      columnPinning: { right: ["actions"] },
    },
    /* */
  })

  return (
    <DataTable
      table={table}
      floatingBar={
        useFloatingBar ? <TeamsTableFloatingBar table={table} /> : null
      }
    >
      <DataTableToolbar table={table} filterFields={filterFields}>
        <TeamsTableToolbarActions table={table} />
      </DataTableToolbar>
    </DataTable>
  )
}
