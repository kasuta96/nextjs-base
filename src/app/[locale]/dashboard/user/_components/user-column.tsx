"use client"

import RoleWithTooltip from "@/components/common/role-with-tooltip"
import {
  ShowDateFromString,
  ShowTranslate,
} from "@/components/common/show-text"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { SearchColumnProps } from "@/components/table/data-table-search"
// import { Checkbox } from "@/components/ui/checkbox"
import { genders, userStatus } from "@/lib/constants/option"
import { ROUTE_DEFAULT_AVATAR, ROUTE_USER } from "@/lib/constants/route"
import { User } from "@/lib/validations/user"
import { Role } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import { UserRowActions } from "./user-row-actions"
import { Crown } from "lucide-react"
import Link from "@/components/Link"

export const UserColumns: ColumnDef<User>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={ShowTranslate("user", column.id)}
        className=""
      />
    ),
    cell: ({ row }) => (
      <div className="flex items-center space-x-2 p-0">
        <div className="relative h-8 w-8">
          <Image
            src={row.original.image || ROUTE_DEFAULT_AVATAR}
            width={32}
            height={32}
            alt=""
            className="rounded-full"
          />
          {row.original.role == "ADMIN" && (
            <div title={row.original.role}>
              <Crown className="absolute -right-2.5 -top-2.5 h-5 w-5 rounded-full bg-background p-0.5 text-sky" />
            </div>
          )}
        </div>
        <div className="max-w-[150px] truncate" title={row.getValue("name")}>
          <Link href={`${ROUTE_USER}/${row.original.id}`}>
            {row.getValue("name")}
          </Link>
        </div>
      </div>
    ),
    meta: {
      cellClass: "md:sticky md:left-0 bg-inherit",
      headerClass: "md:sticky md:left-0 bg-background",
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={ShowTranslate("user", column.id)}
      />
    ),
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={ShowTranslate("user", column.id)}
      />
    ),
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={ShowTranslate("user", column.id)}
      />
    ),
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={ShowTranslate("user", column.id)}
      />
    ),
    cell: ({ row }) => {
      const gender = genders.find(
        (gender) => gender.value === row.getValue("gender")
      )
      if (!gender) return null
      return <div>{ShowTranslate("user", gender.label)}</div>
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: false,
  },
  {
    accessorKey: "dateOfBirth",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={ShowTranslate("user", column.id)}
      />
    ),
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
        {ShowDateFromString(row.getValue("dateOfBirth"))}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={ShowTranslate("user", column.id)}
      />
    ),
    cell: ({ row }) => {
      const status = userStatus.find(
        (status) => status.value === row.getValue("status")
      )
      if (!status) return null
      return <div>{ShowTranslate("user", status.label)}</div>
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: false,
  },
  {
    accessorKey: "roles",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={ShowTranslate("user", column.id)}
      />
    ),
    cell: ({ row }) => {
      const roles = row.getValue("roles") as Role[]
      return <RoleWithTooltip roles={roles} userRole={row.original.role} />
    },
    // filterFn: (row, name, value) => {
    //   return value.includes(row.getValue(name))
    // },
    enableSorting: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <UserRowActions user={row.original} />,
    meta: {
      headerClass: "sticky right-0 bg-background",
      cellClass: "sticky right-0 bg-inherit",
    },
  },
]

export const UserSearchColumns: SearchColumnProps[] = [
  { id: "name", type: "text" },
  { id: "email", type: "text" },
  { id: "firstName", type: "text" },
  { id: "lastName", type: "text" },
  {
    id: "gender",
    type: "option",
    options: genders,
  },
  {
    id: "status",
    type: "option",
    options: userStatus,
  },
]
