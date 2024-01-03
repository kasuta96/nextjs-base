"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  ProfileSchema,
  ProfileType,
  GenderSchema,
  User,
  GenderType,
} from "@/lib/validations/user"
import { useTranslations } from "next-intl"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { SelectRef } from "@/components/ui/custom-form"
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"
import { InputGroup } from "@/components/form/input-group"
import SaveButton from "@/components/Button"
import { toast } from "@/components/ui/use-toast"

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: User
}

export function ProfileForm({ user, ...props }: UserNameFormProps) {
  const router = useRouter()
  const t = useTranslations()
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user.name,
      bio: user.bio || "",
      image: user.image || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      gender: user.gender || undefined,
      dateOfBirth: user.dateOfBirth?.toISOString().slice(0, 10) || undefined,
      phoneNumber: user.phoneNumber || "",
      zipCode: user.zipCode || "",
      address1: user.address1 || "",
      address2: user.address2 || "",
    },
  })
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  async function onSubmit(data: ProfileType) {
    setIsSaving(true)

    const response = await fetch(`/api/profile/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    setIsSaving(false)

    if (!response?.ok) {
      return toast({ title: t("notify.error"), variant: "destructive" })
    }

    reset(data)
    toast({ title: t("notify.updateSuccess"), variant: "success" })
  }

  const resetForm = () => {
    reset()
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{t("common.Profile")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid items-center gap-4">
            <InputGroup label={t("user.name")} error={errors.name}>
              <Input id="name" {...register("name")} />
            </InputGroup>
            <InputGroup label={t("user.bio")} error={errors.bio}>
              <Textarea className="h-24" id="bio" {...register("bio")} />
            </InputGroup>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{t("common.Detailed information")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid items-center gap-4">
            <InputGroup label={t("user.firstName")} error={errors.firstName}>
              <Input id="firstName" {...register("firstName")} />
            </InputGroup>
            <InputGroup label={t("user.lastName")} error={errors.lastName}>
              <Input id="lastName" {...register("lastName")} />
            </InputGroup>
            <InputGroup label={t("user.gender")} error={errors.gender}>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <SelectRef
                    onValueChange={(e: GenderType) => field.onChange(e)}
                    {...field}
                  >
                    <SelectTrigger>
                      <SelectValue />
                      <SelectContent position="popper">
                        {Object.entries(GenderSchema.enum).map(
                          ([key, value]) => (
                            <SelectItem value={key} key={key}>
                              {t(`user.${value}`)}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </SelectTrigger>
                  </SelectRef>
                )}
              />
            </InputGroup>
            <InputGroup
              label={t("user.dateOfBirth")}
              error={errors.dateOfBirth}
            >
              <Input
                type="date"
                id="dateOfBirth"
                {...register("dateOfBirth")}
              />
            </InputGroup>
            <InputGroup
              label={t("user.phoneNumber")}
              error={errors.phoneNumber}
            >
              <Input id="phoneNumber" {...register("phoneNumber")} />
            </InputGroup>
            <InputGroup label={t("user.zipCode")} error={errors.zipCode}>
              <Input id="zipCode" {...register("zipCode")} />
            </InputGroup>
            <InputGroup label={t("user.address1")} error={errors.address1}>
              <Input id="address1" {...register("address1")} />
            </InputGroup>
            <InputGroup label={t("user.address2")} error={errors.address2}>
              <Input id="address2" {...register("address2")} />
            </InputGroup>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <Button type="button" variant="ghost" onClick={resetForm}>
            {t("common.Reset")}
          </Button>
          <SaveButton disabled={isSaving || !isDirty} loading={isSaving} />
        </CardFooter>
      </Card>
    </form>
  )
}

const InputSkeleton = () => {
  return (
    <div className="flex flex-col space-y-1.5">
      <div className="flex items-center space-x-3">
        <Skeleton className="h-6 w-[100px] flex-none text-right text-gray max-[400px]:w-[60px]" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}

const CardHeaderSkeleton = () => {
  return (
    <CardHeader>
      <CardTitle>
        <Skeleton className="h-5 w-1/2" />
      </CardTitle>
    </CardHeader>
  )
}

export const SkeletonProfile = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeaderSkeleton />
        <CardContent>
          <div className="grid items-center gap-4">
            <InputSkeleton />
            <InputSkeleton />
            <InputSkeleton />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeaderSkeleton />
        <CardContent>
          <div className="grid items-center gap-4">
            <InputSkeleton />
            <InputSkeleton />
            <InputSkeleton />
            <InputSkeleton />
            <InputSkeleton />
            <InputSkeleton />
            <InputSkeleton />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
