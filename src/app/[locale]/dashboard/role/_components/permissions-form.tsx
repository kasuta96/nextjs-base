"use client"

import React, { Dispatch, SetStateAction, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  RoleWithPermissionsSchema,
  RoleWithPermissionsType,
} from "@/lib/validations/role"
import { useTranslations } from "next-intl"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { PermissionTooltip } from "./permission-tooltip"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Close } from "@radix-ui/react-dialog"
import { useRouter } from "next/navigation"
import { defaultPermissions } from "@/lib/constants/permission"
import { RoleData } from "./role-accordion"
import { RoleDelete } from "./role-delete"
import SaveButton from "@/components/Button"
import { toast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"

export function PermissionsForm({
  role,
  setOpen,
  write,
}: {
  role?: RoleData
  setOpen?: Dispatch<SetStateAction<boolean>>
  write: boolean
}) {
  const t = useTranslations()
  const router = useRouter()
  const [editRole, setEditRole] = useState(!role)
  const [isSaving, setIsSaving] = useState(false)

  const form = useForm<RoleWithPermissionsType>({
    resolver: zodResolver(RoleWithPermissionsSchema),
    defaultValues: {
      name: role?.name || "",
      remarks: role?.remarks || "",
      permissions: role?.permissions || defaultPermissions,
    },
  })

  async function onSubmit(data: RoleWithPermissionsType) {
    setIsSaving(true)
    const fetchUrl = `/api/role/${role?.id || ""}`
    const fetchMethod = role ? "PATCH" : "POST"

    const response = await fetch(fetchUrl, {
      method: fetchMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    setIsSaving(false)

    if (!response?.ok) {
      return toast({ title: t("notify.error"), variant: "destructive" })
    }

    setOpen && setOpen(false)
    setEditRole(false)
    form.reset(data)
    toast({ title: t("notify.updateSuccess"), variant: "success" })
    router.refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {editRole ? (
          <>
            <FormField
              control={form.control}
              name={`name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("user.name")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`remarks`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("user.remarks")}</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        ) : (
          <p className="max-h-16 overflow-auto whitespace-pre-line">
            {role?.remarks}
          </p>
        )}

        <div className="space-y-2">
          <Table>
            <TableBody>
              {(role?.permissions || defaultPermissions).map((pms, index) => (
                <TableRow key={pms.permissionId}>
                  <TableCell className="flex items-center space-x-2">
                    <span>{t(`permission.${pms.permission?.name}`)}</span>
                    <div>
                      <PermissionTooltip permission={pms.permission} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`permissions.${index}.read`}
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              disabled={!editRole}
                              onCheckedChange={(e: boolean) =>
                                field.onChange(e)
                              }
                            />
                          </FormControl>
                          <FormLabel>Read</FormLabel>
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`permissions.${index}.write`}
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              disabled={!editRole}
                              onCheckedChange={(e: boolean) =>
                                field.onChange(e)
                              }
                            />
                          </FormControl>
                          <FormLabel>Write</FormLabel>
                        </FormItem>
                      )}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2">
          {editRole ? (
            <>
              {role ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditRole(false)}
                >
                  {t("common.Cancel")}
                </Button>
              ) : (
                <Close asChild>
                  <Button variant="outline">{t("common.Close")}</Button>
                </Close>
              )}
              <SaveButton
                disabled={isSaving || !form.formState.isDirty}
                loading={isSaving}
              />
            </>
          ) : (
            write && (
              <>
                {role && <RoleDelete role={role} />}
                <div
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "cursor-pointer"
                  )}
                  onClick={() => setEditRole(true)}
                >
                  {t("common.Edit")}
                </div>
              </>
            )
          )}
        </div>
      </form>
    </Form>
  )
}

export default PermissionsForm
