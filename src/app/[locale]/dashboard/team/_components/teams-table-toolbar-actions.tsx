"use client"

import { type Table } from "@tanstack/react-table"

import { exportTableToCSV } from "@/lib/export"
import { Button } from "@/components/ui/button"

import { CreateTeamDialog } from "./create-team-dialog"
import { Team } from "@prisma/client"
import { ArrowDownToLineIcon } from "lucide-react"

interface TeamsTableToolbarActionsProps {
  table: Table<Team>
}

export function TeamsTableToolbarActions({
  table,
}: TeamsTableToolbarActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <CreateTeamDialog />
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          exportTableToCSV(table, {
            filename: "teams",
            excludeColumns: ["select", "actions"],
          })
        }
      >
        <ArrowDownToLineIcon className="mr-2 size-4" aria-hidden="true" />
        Export
      </Button>
      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  )
}
