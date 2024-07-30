import * as React from "react"
import {
  CircleCheckBigIcon,
  XIcon,
  DownloadIcon,
  RotateCwIcon,
  TrashIcon,
} from "lucide-react"
import { SelectTrigger } from "@radix-ui/react-select"
import { type Table } from "@tanstack/react-table"
import { toast } from "sonner"

import { exportTableToCSV } from "@/lib/export"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Team } from "@prisma/client"
import { updateTeams } from "@/lib/services/team"
import { status as statusOpt } from "@/lib/constants/option"
import { Kbd } from "@/components/common/kbd"
import { DeleteTeamsDialog } from "./delete-teams-dialog"

interface TeamsTableFloatingBarProps {
  table: Table<Team>
}

export function TeamsTableFloatingBar({ table }: TeamsTableFloatingBarProps) {
  const rows = table.getFilteredSelectedRowModel().rows

  const [isPending, startTransition] = React.useTransition()
  const [method, setMethod] = React.useState<
    "update-status" | "export" | "delete"
  >()
  const [showDeleteTeamDialog, setShowDeleteTeamDialog] = React.useState(false)

  // Clear selection on Escape key press
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        table.toggleAllRowsSelected(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [table])

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 mx-auto w-fit px-4">
      <DeleteTeamsDialog
        open={showDeleteTeamDialog}
        onOpenChange={setShowDeleteTeamDialog}
        teams={rows.map((row) => row.original)}
        showTrigger={false}
        onSuccess={() => table.toggleAllRowsSelected(false)}
      />
      <div className="w-full overflow-x-auto">
        <div className="mx-auto flex w-fit items-center gap-2 rounded-md border bg-card p-2 shadow-2xl">
          <div className="flex h-7 items-center rounded-md border border-dashed pl-2.5 pr-1">
            <span className="whitespace-nowrap text-xs">
              {rows.length} selected
            </span>
            <Separator orientation="vertical" className="ml-2 mr-1" />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-5 hover:border"
                  onClick={() => table.toggleAllRowsSelected(false)}
                >
                  <XIcon className="size-3.5 shrink-0" aria-hidden="true" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="flex items-center border bg-accent px-2 py-1 font-semibold text-foreground dark:bg-zinc-900">
                <p className="mr-2">Clear selection</p>
                <Kbd abbrTitle="Escape" variant="outline">
                  Esc
                </Kbd>
              </TooltipContent>
            </Tooltip>
          </div>
          <Separator orientation="vertical" className="hidden h-5 sm:block" />
          <div className="flex items-center gap-1.5">
            <Select
              onValueChange={(value: Team["status"]) => {
                setMethod("update-status")

                startTransition(async () => {
                  const { error } = await updateTeams({
                    ids: rows.map((row) => row.original.id),
                    status: value,
                  })

                  if (error) {
                    toast.error(error)
                    return
                  }

                  toast.success("Teams updated")
                })
              }}
            >
              <Tooltip delayDuration={250}>
                <SelectTrigger asChild>
                  <TooltipTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="size-7 border data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
                      disabled={isPending}
                    >
                      {isPending && method === "update-status" ? (
                        <RotateCwIcon
                          className="size-3.5 animate-spin"
                          aria-hidden="true"
                        />
                      ) : (
                        <CircleCheckBigIcon
                          className="size-3.5"
                          aria-hidden="true"
                        />
                      )}
                    </Button>
                  </TooltipTrigger>
                </SelectTrigger>
                <TooltipContent className="border bg-accent font-semibold text-foreground dark:bg-zinc-900">
                  <p>Update status</p>
                </TooltipContent>
              </Tooltip>
              <SelectContent align="center">
                <SelectGroup>
                  {statusOpt.map((status) => (
                    <SelectItem
                      key={status.value}
                      value={status.value}
                      className="capitalize"
                    >
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Tooltip delayDuration={250}>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="size-7 border"
                  onClick={() => {
                    setMethod("export")

                    startTransition(() => {
                      exportTableToCSV(table, {
                        excludeColumns: ["select", "actions"],
                        onlySelected: true,
                      })
                    })
                  }}
                  disabled={isPending}
                >
                  {isPending && method === "export" ? (
                    <RotateCwIcon
                      className="size-3.5 animate-spin"
                      aria-hidden="true"
                    />
                  ) : (
                    <DownloadIcon className="size-3.5" aria-hidden="true" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent className="border bg-accent font-semibold text-foreground dark:bg-zinc-900">
                <p>Export teams</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip delayDuration={250}>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="size-7 border"
                  onClick={() => setShowDeleteTeamDialog(true)}
                  disabled={isPending}
                >
                  {isPending && method === "delete" ? (
                    <RotateCwIcon
                      className="size-3.5 animate-spin"
                      aria-hidden="true"
                    />
                  ) : (
                    <TrashIcon className="size-3.5" aria-hidden="true" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent className="border bg-accent font-semibold text-foreground dark:bg-zinc-900">
                <p>Delete teams</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  )
}
