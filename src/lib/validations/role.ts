import { z } from "zod"

export const PermissionSchema = z.object({
  id: z.string(),
  name: z.string(),
  remarks: z.string().nullable(),
})
export type PermissionType = z.infer<typeof PermissionSchema>

export const RolePermissionSchema = z.object({
  // roleId: z.string().optional(),
  permissionId: z.string(),
  read: z.boolean().default(false),
  write: z.boolean().default(false),
  permission: PermissionSchema.optional(),
})
export type RolePermissionType = z.infer<typeof RolePermissionSchema>

export const RoleSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2).max(255),
  nameTrans: z.string().optional(),
  remarks: z.string().optional(),
  remarksTrans: z.string().optional(),
})
export type RoleType = z.infer<typeof RoleSchema>

export const RoleWithPermissionsSchema = RoleSchema.extend({
  permissions: z.array(RolePermissionSchema).optional(),
})

export type RoleWithPermissionsType = z.infer<typeof RoleWithPermissionsSchema>
