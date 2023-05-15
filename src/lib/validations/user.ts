import { Gender, UserRole, UserStatus } from '@prisma/client'
import { z } from 'zod'

export const GenderSchema = z.nativeEnum(Gender)
export type GenderType = `${z.infer<typeof GenderSchema>}`

export const UserRoleSchema = z.nativeEnum(UserRole)
export type UserRoleType = `${z.infer<typeof UserRoleSchema>}`

export const UserStatusSchema = z.nativeEnum(UserStatus)
export type UserStatusType = `${z.infer<typeof UserStatusSchema>}`

export const ProfileSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3),
  image: z.string().optional(),
  bio: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  gender: GenderSchema.optional(),
  dateOfBirth: z.string().optional(),
  phoneNumber: z.string().optional(),
  zipCode: z.string().optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  languageCode: z.string().optional(),
})
export type ProfileType = z.infer<typeof ProfileSchema>

// export profileList = ProfileSchema

export const UserSchema = ProfileSchema.merge(
  z.object({
    role: UserRoleSchema.optional(),
    status: UserStatusSchema.optional(),
    emailVerified: z.string().optional(),
    remarks: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    updatedUserId: z.string().optional(),
    approveredAt: z.string().optional(),
    approveredUserId: z.string().optional(),
    deletedAt: z.string().optional(),
    deletedUserId: z.string().optional(),
  })
)
export type UserType = z.infer<typeof UserSchema>
