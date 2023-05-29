import { permissions } from '../src/lib/constants/permission'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  permissions.map(async (pms) => {
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
