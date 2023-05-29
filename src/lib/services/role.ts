import { db } from '@/lib/db'

export async function getRoles() {
  return await db.role.findMany({
    include: {
      permissions: {
        include: {
          permission: true,
        },
      },
    },
    orderBy: [{ updatedAt: 'desc' }],
  })
}
