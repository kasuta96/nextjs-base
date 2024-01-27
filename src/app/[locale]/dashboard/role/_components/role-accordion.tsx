"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { RoleCreate } from "./role-create"
import { Permission, Role, RolePermissions } from "@prisma/client"
import { PermissionsForm } from "./permissions-form"
import { useTranslations } from "next-intl"
import { Empty } from "@/components/common/empty"

export type RoleData = Role & {
  permissions: (RolePermissions & {
    permission?: Permission
  })[]
}

export function RoleAccordion({
  roles,
  write,
}: {
  roles: RoleData[]
  write: boolean
}) {
  const t = useTranslations()

  return (
    <div className="space-y-4">
      {write && <RoleCreate write={write} />}
      <Accordion
        type="single" // single | multiple
        collapsible // use with type single
        className="grid gap-4"
      >
        {roles.length ? (
          roles.map((role) => (
            <AccordionItem
              value={role.id}
              key={role.id}
              className="h-fit rounded-lg border px-4 hover:shadow-lg"
            >
              <AccordionTrigger>{role.name}</AccordionTrigger>
              <AccordionContent className="px-2">
                <PermissionsForm role={role} write={write} />
              </AccordionContent>
            </AccordionItem>
          ))
        ) : (
          <Empty />
        )}
      </Accordion>
    </div>
  )
}
