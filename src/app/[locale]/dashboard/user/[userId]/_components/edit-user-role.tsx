"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Role } from "@prisma/client"
import {
  BooleanRecord,
  convertToBooleanRecord,
  getDirtyValues,
} from "@/lib/helper"
import { User } from "@/lib/validations/user"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import SaveButton from "@/components/common/button"
import { SkeletonSwitch } from "@/components/skeleton/switch"
import { Empty } from "@/components/common/empty"

export const EditUserRolesForm = ({
  user,
  write,
}: {
  user?: User
  write?: boolean
}) => {
  const t = useTranslations()
  const router = useRouter()
  const [isEdit, setIsEdit] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [roles, setRoles] = useState([] as Role[])

  const defaultValues = user?.userRoles
    ? convertToBooleanRecord(user?.userRoles)
    : {}

  const form = useForm<BooleanRecord>({
    defaultValues: defaultValues,
  })

  async function onSubmit(data: BooleanRecord) {
    setIsLoading(true)
    const dirtyValues = getDirtyValues(form.formState.dirtyFields, data)

    const fetchUrl = `/api/user/${user?.id}/role`

    const response = await fetch(fetchUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dirtyValues),
    })

    setIsLoading(false)
    if (!response?.ok) {
      return toast.error(t("notify.error"))
    }
    setIsEdit(false)
    toast.success(t("notify.updateSuccess"))
    router.refresh()
  }

  const cancelForm = () => {
    setIsEdit(false)
    form.reset()
  }

  useMemo(async () => {
    if (isEdit) {
      setIsLoading(true)
      const res = await fetch("/api/role", { cache: "no-store" })
      setIsLoading(false)
      if (!res?.ok) {
        toast.error(t("notify.error"))
        setIsEdit(false)
      } else {
        setRoles(await res.json())
      }
    }
  }, [isEdit, t])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {isEdit && !isLoading ? (
          <div className="space-y-4">
            {roles.map((r) => (
              <FormField
                key={r.id}
                control={form.control}
                name={r.id}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">{r.name}</FormLabel>
                      <FormDescription>{r.remarks}</FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </div>
        ) : user?.userRoles.length ? (
          <div className="space-y-4">
            {user.userRoles.map((userRole) => (
              <FormItem
                key={userRole.role.id}
                className="flex flex-row items-center justify-between space-x-2 rounded-lg border p-4"
              >
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    {userRole.role.name}
                  </FormLabel>
                  <FormDescription>{userRole.role.remarks}</FormDescription>
                </div>
                <FormControl>
                  {isLoading ? (
                    <SkeletonSwitch />
                  ) : (
                    <Switch checked={true} disabled />
                  )}
                </FormControl>
              </FormItem>
            ))}
          </div>
        ) : (
          <Empty />
        )}
        <div className="flex items-center justify-end space-x-2">
          {isEdit ? (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => cancelForm()}
              >
                {t("common.Cancel")}
              </Button>
              <SaveButton
                disabled={isLoading || !form.formState.isDirty}
                loading={isLoading}
              />
            </>
          ) : write ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEdit(true)}
            >
              {t("common.Edit")}
            </Button>
          ) : (
            <></>
          )}
        </div>
      </form>
    </Form>
  )
}
