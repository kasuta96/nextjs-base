import { db } from "@/lib/db"
import { Role, RolePermissions } from "@prisma/client"
import { AllPermission } from "~/types/next-auth"

export async function getRoles() {
  return await db.role.findMany({
    orderBy: [{ updatedAt: "desc" }],
  })
}

export async function getRoleIncludePermissions() {
  return await db.role.findMany({
    include: {
      permissions: {
        include: {
          permission: true,
        },
      },
    },
    orderBy: [{ updatedAt: "desc" }],
  })
}

export function reformPermission(
  roles: (Role & {
    permissions: RolePermissions[]
  })[]
) {
  const { read, write } = roles.reduce(
    (result: AllPermission, role) => {
      const roleReadPms = role.permissions.filter((pms) => pms.read)
      const roleReadPmsIds = roleReadPms.map((pms) => pms.permissionId)
      result.read.push(...roleReadPmsIds)

      const roleWritePms = role.permissions.filter((pms) => pms.write)
      const roleWritePmsIds = roleWritePms.map((pms) => pms.permissionId)
      result.write.push(...roleWritePmsIds)

      return result
    },
    { read: [], write: [] }
  )

  const allPermissions = {
    read: read,
    write: write,
  }

  return allPermissions
}
