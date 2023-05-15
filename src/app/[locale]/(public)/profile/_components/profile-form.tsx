'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  ProfileSchema,
  ProfileType,
  GenderSchema,
} from '@/lib/validations/user'
import { useTranslations } from 'next-intl'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Loader2 } from 'lucide-react'
import { SelectRef } from '@/components/ui/custom-form'
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Skeleton } from '@/components/ui/skeleton'

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: ProfileType
}

export function ProfileForm({ user, ...props }: UserNameFormProps) {
  const t = useTranslations()
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<ProfileType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user.name,
      bio: user.bio,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth?.slice(0, 10),
      phoneNumber: user.phoneNumber,
      zipCode: user.zipCode,
      address1: user.address1,
      address2: user.address2,
    },
  })
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  async function onSubmit(data: ProfileType) {
    setIsSaving(true)

    const response = await fetch(`/api/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    setIsSaving(false)

    if (!response?.ok) {
      return toast.error(t('notify.error'), {
        icon: '🙀',
      })
    }

    toast.success(t('notify.updateSuccess'), { icon: '👌' })
  }

  const resetForm = () => {
    reset()
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{t('common.Profile')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label className="text-gray" htmlFor="name">
                {t('user.name')}
              </Label>
              <Input id="name" {...register('name')} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-gray" htmlFor="bio">
                {t('user.bio')}
              </Label>
              <Textarea id="bio" {...register('bio')} />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{t('common.Detailed information')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label className="text-gray" htmlFor="firstName">
                {t('user.firstName')}
              </Label>
              <Input id="firstName" {...register('firstName')} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-gray" htmlFor="lastName">
                {t('user.lastName')}
              </Label>
              <Input id="lastName" {...register('lastName')} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-gray" htmlFor="gender">
                {t('user.gender')}
              </Label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <SelectRef onValueChange={field.onChange} {...field}>
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
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-gray" htmlFor="dateOfBirth">
                {t('user.dateOfBirth')}
              </Label>
              <Input
                type="date"
                id="dateOfBirth"
                {...register('dateOfBirth')}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-gray" htmlFor="phoneNumber">
                {t('user.phoneNumber')}
              </Label>
              <Input id="phoneNumber" {...register('phoneNumber')} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-gray" htmlFor="zipCode">
                {t('user.zipCode')}
              </Label>
              <Input id="zipCode" {...register('zipCode')} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-gray" htmlFor="address1">
                {t('user.address1')}
              </Label>
              <Input id="address1" {...register('address1')} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="text-gray" htmlFor="address2">
                {t('user.address2')}
              </Label>
              <Input id="address2" {...register('address2')} />
            </div>
          </div>
          {errors && (
            <div className="space-x-2 px-1 py-4 text-xs text-destructive">
              {Object.entries(errors).map(([key, value]) => (
                <p key={key}>
                  {t(`user.${key}`)}: {value.message}
                </p>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <Button type="button" variant="ghost" onClick={resetForm}>
            {t('common.Reset')}
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <span>{t('common.Save')}</span>
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

export function SkeletonProfile() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeaderSkeleton />
        <CardContent>
          <div className="grid items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-8 w-full" />
            </div>
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

const InputSkeleton = () => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-8 w-full" />
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
