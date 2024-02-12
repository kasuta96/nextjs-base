"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { getAccountType } from "@/lib/helper"
import {
  GenderSchema,
  User,
  UserPrivateSchema,
  UserPrivateType,
  UserPublicSchema,
  UserPublicType,
  UserStatusSchema,
} from "@/lib/validations/user"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { SelectItem } from "@/components/ui/select"
import { SaveButton } from "@/components/common/button"
import {
  InputFormField,
  DateFormField,
  SelectFormField,
  DateTimeFormField,
} from "@/components/form/input-group"

export const EditUserGeneralForm = ({
  user,
  locale,
  write,
}: {
  user?: UserPublicType
  locale?: string
  write?: boolean
}) => {
  const t = useTranslations()
  const router = useRouter()
  const [isEdit, setIsEdit] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const form = useForm<UserPublicType>({
    resolver: zodResolver(UserPublicSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      dateOfBirth: user?.dateOfBirth || undefined,
      gender: user?.gender || undefined,
      bio: user?.bio || "",
      // image: user?.image || "",
      status: user?.status || undefined,
    },
    // mode: 'onChange',
  })

  async function onSubmit(data: UserPublicType) {
    setIsSaving(true)
    const fetchUrl = user ? `/api/user/${user.id}` : `/api/user`
    const fetchMethod = user ? "PATCH" : "POST"

    const response = await fetch(fetchUrl, {
      method: fetchMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    setIsSaving(false)

    if (!response?.ok) {
      return toast.error(t("notify.error"))
    }

    setIsEdit(false)
    form.reset(data)
    toast.success(t("notify.updateSuccess"))
    router.refresh()
  }

  const cancelForm = () => {
    setIsEdit(false)
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <InputFormField
          type="text"
          form={form}
          name="email"
          label={t("user.email")}
          value={user?.email}
          isEdit={false}
        />
        <InputFormField
          type="text"
          form={form}
          name="name"
          label={t("user.name")}
          value={user?.name}
          isEdit={isEdit}
        />
        <InputFormField
          type="text"
          form={form}
          name="firstName"
          label={t("user.firstName")}
          value={user?.firstName}
          isEdit={isEdit}
        />
        <InputFormField
          type="text"
          form={form}
          name="lastName"
          label={t("user.lastName")}
          value={user?.lastName}
          isEdit={isEdit}
        />
        <DateFormField
          type="date"
          form={form}
          name="dateOfBirth"
          label={t("user.dateOfBirth")}
          isEdit={isEdit}
          value={user?.dateOfBirth}
          locale={locale}
        />
        <SelectFormField
          type="select"
          form={form}
          name="gender"
          label={t("user.gender")}
          value={user ? t(`user.${user.gender}`) : ""}
          isEdit={isEdit}
        >
          {Object.entries(GenderSchema.enum).map(([key, value]) => (
            <SelectItem value={key} key={key}>
              {t(`user.${value}`)}
            </SelectItem>
          ))}
        </SelectFormField>

        <InputFormField
          type="textarea"
          form={form}
          name="bio"
          label={t("user.bio")}
          value={user?.bio}
          isEdit={isEdit}
        />
        <SelectFormField
          type="select"
          form={form}
          name="status"
          label={t("user.status")}
          value={user ? t(`user.${user.status}`) : ""}
          isEdit={isEdit}
        >
          {Object.entries(UserStatusSchema.enum).map(([key, value]) => (
            <SelectItem value={key} key={key}>
              {t(`user.${value}`)}
            </SelectItem>
          ))}
        </SelectFormField>
        {/* languageCode */}

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
                disabled={isSaving || !form.formState.isDirty}
                loading={isSaving}
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

export const EditUserPrivateForm = ({
  user,
  write,
}: {
  user?: UserPrivateType
  write?: boolean
}) => {
  const t = useTranslations()
  const router = useRouter()
  const [isEdit, setIsEdit] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const form = useForm<UserPrivateType>({
    resolver: zodResolver(UserPrivateSchema),
    defaultValues: {
      phoneNumber: user?.phoneNumber || "",
      zipCode: user?.zipCode || "",
      address1: user?.address1 || "",
      address2: user?.address2 || "",
      remarks: user?.remarks || "",
    },
  })

  async function onSubmit(data: UserPrivateType) {
    setIsSaving(true)
    const fetchUrl = `/api/user/${user?.id}`

    const response = await fetch(fetchUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    setIsSaving(false)

    if (!response?.ok) {
      return toast.error(t("notify.error"))
    }

    setIsEdit(false)
    form.reset(data)
    toast.success(t("notify.updateSuccess"))
    router.refresh()
  }

  const cancelForm = () => {
    setIsEdit(false)
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <InputFormField
          type="text"
          form={form}
          name="phoneNumber"
          label={t("user.phoneNumber")}
          value={user?.phoneNumber}
          isEdit={isEdit}
        />
        <InputFormField
          type="text"
          form={form}
          name="zipCode"
          label={t("user.zipCode")}
          value={user?.zipCode}
          isEdit={isEdit}
        />
        <InputFormField
          type="text"
          form={form}
          name="address1"
          label={t("user.address1")}
          value={user?.address1}
          isEdit={isEdit}
        />
        <InputFormField
          type="text"
          form={form}
          name="address2"
          label={t("user.address2")}
          value={user?.address2}
          isEdit={isEdit}
        />
        <InputFormField
          type="textarea"
          form={form}
          name="remarks"
          label={t("user.remarks")}
          value={user?.remarks}
          isEdit={isEdit}
        />

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
                disabled={isSaving || !form.formState.isDirty}
                loading={isSaving}
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

export const UserOther = ({
  user,
  write,
}: {
  user?: User
  write?: boolean
}) => {
  const t = useTranslations()

  return (
    <div className="space-y-4">
      <InputFormField
        type="text"
        name="account"
        value={getAccountType(user?.accounts)}
        label={t("common.LoginType")}
        isEdit={false}
      />
      <DateTimeFormField
        type="datetime"
        name="createdAt"
        value={user?.createdAt}
        label={t("user.createdAt")}
        isEdit={false}
      />
      <DateTimeFormField
        type="datetime"
        name="updatedAt"
        value={user?.updatedAt}
        label={t("user.updatedAt")}
        isEdit={false}
      />
      <InputFormField
        type="text"
        name="updatedUser"
        value={user?.updatedUser?.name}
        label={t("user.updatedUser")}
        isEdit={false}
      />
      <DateTimeFormField
        type="datetime"
        name="approvedAt"
        value={user?.approvedAt}
        label={t("user.approvedAt")}
        isEdit={false}
      />
      <InputFormField
        type="text"
        name="approvedUser"
        value={user?.approvedUser?.name}
        label={t("user.approvedUser")}
        isEdit={false}
      />
      {/* emailVerified */}
      {/* deletedAt */}
      {/* deletedUserId */}
    </div>
  )
}
