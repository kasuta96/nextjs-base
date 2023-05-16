import { Permission, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const permission: Permission[] = [
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

async function main() {
  permission.map(async (pms) => {
    await prisma.permission.upsert({
      where: { id: pms.id },
      update: { name: pms.name, remarks: pms.remarks },
      create: { id: pms.id, name: pms.name, remarks: pms.remarks },
    })
  })
  console.log('🔐 Permission seed 🚀')
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
