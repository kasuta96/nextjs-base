import { checkPermission } from "@/lib/services/permission"
import NoReadPermission from "@/components/errors/no-read-permission"
import { SearchParams } from "~/types"
import { searchTeamParams } from "@/lib/validations/team"
import { getTeams } from "@/lib/services/team"
import React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { TeamsTable } from "./_components/teams-table"
import { DateRangePicker } from "@/components/data-table/date-range-picker"

export const metadata = {
  title: "Teams",
}
export interface IndexPageProps {
  searchParams: SearchParams
}

export default async function TeamPage({ searchParams }: IndexPageProps) {
  const { read, write } = await checkPermission("team")
  if (!read) return <NoReadPermission />

  const search = searchTeamParams.parse(searchParams)
  const teams = await getTeams(search)

  return (
    <>
      {/**
       * The `DateRangePicker` component is used to render the date range picker UI.
       * It is used to filter the Teams based on the selected date range it was created at.
       * The business logic for filtering the Teams based on the selected date range is handled inside the component.
       */}
      <React.Suspense fallback={<Skeleton className="h-7 w-52" />}>
        <DateRangePicker
          triggerSize="sm"
          triggerClassName="ml-auto w-56 sm:w-60"
          align="end"
        />
      </React.Suspense>
      <React.Suspense
        fallback={
          <DataTableSkeleton
            columnCount={5}
            searchableColumnCount={1}
            filterableColumnCount={2}
            cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
            shrinkZero
          />
        }
      >
        {/**
         * Passing promises and consuming them using React.use for triggering the suspense fallback.
         * @see https://react.dev/reference/react/use
         */}
        <TeamsTable teamsPromise={Promise.resolve(teams)} />
      </React.Suspense>
    </>
  )
}
