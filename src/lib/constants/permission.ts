import { Permission } from '@prisma/client'
import { RolePermissionType } from '../validations/role'

export const permissions: Permission[] = [
  {
    id: 'role',
    name: 'role_name',
    remarks: 'role_remarks',
  },
  {
    id: 'user_public',
    name: 'user_public_name',
    remarks: 'user_public_remarks',
  },
  {
    id: 'user_private',
    name: 'user_private_name',
    remarks: 'user_private_remarks',
  },
]

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
