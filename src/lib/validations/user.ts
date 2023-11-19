import { Gender, Role, UserRole, UserStatus } from "@prisma/client"
import { z } from "zod"

export const GenderSchema = z.nativeEnum(Gender)
export type GenderType = `${z.infer<typeof GenderSchema>}`

export const UserRoleSchema = z.nativeEnum(UserRole)
export type UserRoleType = `${z.infer<typeof UserRoleSchema>}`

export const UserStatusSchema = z.nativeEnum(UserStatus)
export type UserStatusType = `${z.infer<typeof UserStatusSchema>}`

export const ProfileSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  image: z.string().nullable(),
  bio: z.string().max(255).nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  gender: GenderSchema.optional(),
  dateOfBirth: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  zipCode: z.string().nullable(),
  address1: z.string().nullable(),
  address2: z.string().nullable(),
  languageCode: z.string().nullable().optional(),
})
export type ProfileType = z.infer<typeof ProfileSchema>

export const UserSchema = ProfileSchema.merge(
  z.object({
    role: UserRoleSchema,
    status: UserStatusSchema,
    emailVerified: z.string().nullable(),
    remarks: z.string().nullable(),
    createdAt: z.string().nullable(),
    updatedAt: z.string().nullable(),
    updatedUserId: z.string().nullable(),
    approvedAt: z.string().nullable(),
    approvedUserId: z.string().nullable(),
    deletedAt: z.string().nullable(),
    deletedUserId: z.string().nullable(),
  })
)
export type UserType = z.infer<typeof UserSchema>

export type User = UserType & {
  roles: Role[]
}
