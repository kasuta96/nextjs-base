import { Account, Gender, Role, UserRole, UserStatus } from "@prisma/client"
import { z } from "zod"
import { phoneRegex, zipCode } from "./common"

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
  phoneNumber: z.string().regex(phoneRegex, "Invalid Number!").nullable(),
  zipCode: z.string().regex(zipCode, "Invalid Number!").nullable(),
  address1: z.string().nullable(),
  address2: z.string().nullable(),
  languageCode: z.string().optional(),
})
export type ProfileType = z.infer<typeof ProfileSchema>

export const UserPublicSchema = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string().min(2).optional(),
  image: z.string().optional(),
  bio: z.string().max(255).optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  gender: GenderSchema.optional(),
  dateOfBirth: z.coerce.date().optional(),
  languageCode: z.string().optional(),
  role: UserRoleSchema.optional(),
  status: UserStatusSchema.optional(),
})
export type UserPublicType = z.infer<typeof UserPublicSchema>

export const UserPrivateSchema = z.object({
  id: z.string().optional(),
  phoneNumber: z.string().regex(phoneRegex, "Invalid Number!").optional(),
  zipCode: z.string().regex(zipCode, "Invalid Number!").optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  remarks: z.string().optional(),
})
export type UserPrivateType = z.infer<typeof UserPrivateSchema>

export const UserSchema = UserPublicSchema.merge(UserPrivateSchema).merge(
  z.object({
    emailVerified: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    updatedUserId: z.string().optional(),
    approvedAt: z.coerce.date().optional(),
    approvedUserId: z.string().optional(),
    deletedAt: z.coerce.date().optional(),
    deletedUserId: z.string().optional(),
  })
)
export type UserType = z.infer<typeof UserSchema>

export type User = UserType & {
  roles: Role[]
  accounts: Account[]
}
