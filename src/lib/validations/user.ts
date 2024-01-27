import {
  Account,
  Gender,
  Role,
  SystemRole,
  UserRole,
  UserStatus,
} from "@prisma/client"
import { z } from "zod"
import { phoneRegex, zipCode } from "./common"

export const GenderSchema = z.nativeEnum(Gender)
export type GenderType = `${z.infer<typeof GenderSchema>}`

export const SystemRoleSchema = z.nativeEnum(SystemRole)
export type SystemRoleType = `${z.infer<typeof SystemRoleSchema>}`

export const UserStatusSchema = z.nativeEnum(UserStatus)
export type UserStatusType = `${z.infer<typeof UserStatusSchema>}`

export const ProfileSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2).max(255),
  image: z.string().max(255).nullable(),
  bio: z.string().nullable(),
  firstName: z.string().max(255).nullable(),
  lastName: z.string().max(255).nullable(),
  gender: GenderSchema.optional(),
  dateOfBirth: z.string().nullable(),
  phoneNumber: z.string().regex(phoneRegex, "Invalid Number!").nullable(),
  zipCode: z.string().regex(zipCode, "Invalid Number!").nullable(),
  address1: z.string().max(255).nullable(),
  address2: z.string().max(255).nullable(),
  languageCode: z.string().optional(),
})
export type ProfileType = z.infer<typeof ProfileSchema>

export const UserPublicSchema = z.object({
  id: z.string().optional(),
  email: z.string().max(255).optional(),
  name: z.string().min(2).max(255).optional(),
  image: z.string().max(255).optional(),
  bio: z.string().optional(),
  firstName: z.string().max(255).optional(),
  lastName: z.string().max(255).optional(),
  gender: GenderSchema.optional(),
  dateOfBirth: z.coerce.date().optional(),
  languageCode: z.string().optional(),
  systemRole: SystemRoleSchema.optional(),
  status: UserStatusSchema.optional(),
})
export type UserPublicType = z.infer<typeof UserPublicSchema>

export const UserPrivateSchema = z.object({
  id: z.string().optional(),
  phoneNumber: z.string().regex(phoneRegex, "Invalid Number!").optional(),
  zipCode: z.string().regex(zipCode, "Invalid Number!").optional(),
  address1: z.string().max(255).optional(),
  address2: z.string().max(255).optional(),
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

// RelatedUser
export const RelatedUserSchema = z.object({
  id: z.string().optional(),
  email: z.string().max(255).optional(),
  name: z.string().min(2).max(255).optional(),
  image: z.string().max(255).optional(),
  systemRole: SystemRoleSchema.optional(),
  status: UserStatusSchema.optional(),
})
export type RelatedUserType = z.infer<typeof RelatedUserSchema>

export type User = UserType & {
  userRoles: (UserRole & { role: Role })[]
  accounts: Account[]
  updatedUser: RelatedUserType
  approvedUser: RelatedUserType
  deletedUser: RelatedUserType
}
