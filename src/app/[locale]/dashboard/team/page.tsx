import { checkPermission } from "@/lib/services/permission"
import NoReadPermission from "@/components/errors/no-read-permission"
import { SearchParams } from "~/types"
import { searchTeamParams } from "@/lib/validations/team"
import { getTeams } from "@/lib/services/team"
import React from "react"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { TeamsTable } from "./_components/teams-table"

export const metadata = {
  title: "Teams",
}
export interface IndexPageProps {
  searchParams: SearchParams
  params: { locale: string }
}

export default async function TeamPage({
  searchParams,
  params: { locale },
}: IndexPageProps) {
  const { read, write } = await checkPermission("team")
  if (!read) return <NoReadPermission />

  const search = searchTeamParams.parse(searchParams)
  const teams = await getTeams(search)

  return (
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
      <TeamsTable teamsPromise={Promise.resolve(teams)} locale={locale} />
    </React.Suspense>
  )
}
