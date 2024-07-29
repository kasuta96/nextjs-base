import { Permission } from "@prisma/client"
import { RolePermissionType } from "../validations/role"

// ⛔️ Do not modify the permission ID (used for prisma/seed.ts & role relation).
// The permission name and remarks are i18n keys (Update i18n (src/messages) when modifying them).
export const permissions = [
  {
    id: "role",
    name: "role_name",
    remarks: "role_remarks",
  },
  {
    id: "user",
    name: "user_name",
    remarks: "user_remarks",
  },
  {
    id: "user_private",
    name: "user_private_name",
    remarks: "user_private_remarks",
  },
  {
    id: "team",
    name: "team_name",
    remarks: "team_remarks",
  },
] as const

export type PermissionIdType = (typeof permissions)[number]["id"]

export const defaultPermissions: RolePermissionType[] = permissions.map(
  (permission) => {
    return {
      permissionId: permission.id,
      read: false,
      write: false,
      permission: {
        id: permission.id,
        name: permission.name,
        remarks: permission.remarks,
      },
    }
  }
)
