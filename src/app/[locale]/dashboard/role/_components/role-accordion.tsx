'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { RoleCreate } from './role-create'
import { Permission, Role, RolePermissions } from '@prisma/client'
import { PermissionsForm } from './permissions-form'
import { useTranslations } from 'next-intl'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'

export type RoleData = Role & {
  permissions: (RolePermissions & {
    permission?: Permission
  })[]
}

export function RoleAccordion({ roles }: { roles: RoleData[] }) {
  const t = useTranslations()

  return (
    <div className="space-y-4">
      <RoleCreate />
      <Accordion
        type="single" // single | multiple
        collapsible // use with type single
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
      >
        {roles.length ? (
          roles.map((role) => (
            <AccordionItem
              value={role.id}
              key={role.id}
              className="h-fit rounded-lg border px-4"
            >
              <AccordionTrigger>{role.name}</AccordionTrigger>
              <AccordionContent className="px-2">
                <PermissionsForm role={role} />
              </AccordionContent>
            </AccordionItem>
          ))
        ) : (
          <div className="text-gray">{t('common.Empty')}</div>
        )}
      </Accordion>
    </div>
  )
}

export const SkeletonRoleAccordion = () => {
  return (
    <div className="space-y-4">
      <Button className="animate-pulse">Loading...</Button>
      <Accordion
        type="multiple"
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
      >
        <SkeletonAccordionItem />
        <SkeletonAccordionItem />
        <SkeletonAccordionItem />
        <SkeletonAccordionItem />
        <SkeletonAccordionItem />
      </Accordion>
    </div>
  )
}

const SkeletonAccordionItem = () => {
  return (
    <AccordionItem value="" className="h-fit rounded-lg border px-4">
      <AccordionTrigger>
        <Skeleton className="h-6 w-20" />
      </AccordionTrigger>
    </AccordionItem>
  )
}
