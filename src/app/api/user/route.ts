import { z } from "zod"
import { db } from "@/lib/db"
import { checkPermission } from "@/lib/services/permission"
import { UserSchema } from "@/lib/validations/user"
import { createSelect } from "@/lib/helper"

export async function GET() {
  try {
    // Check permission
    const userPublicPms = await checkPermission("user")
    const userPrivatePms = await checkPermission("user")
    if (!userPublicPms.read && !userPrivatePms.read) {
      return new Response(null, { status: 403 })
    }

    const users = db.user.findMany({
      select: createSelect(UserSchema),
      orderBy: {
        updatedAt: "desc",
      },
    })

    return new Response(JSON.stringify(users ?? null), { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    console.log(error)
    return new Response(null, { status: 500 })
  }
}

// export async function POST(req: Request) {
//   try {
//     // Check permission
//     const { write } = await checkPermission('user')
//     if (!write) {
//       return new Response(null, { status: 403 })
//     }

//     // Get the request body and validate it.
//     const body = await req.json()
//     const payload = RoleWithPermissionsSchema.parse(body)

//     // Create the user.
//     await db.user.create({
//       data: {
//         name: payload.name,
//         nameTrans: payload.nameTrans,
//         remarks: payload.remarks,
//         remarksTrans: payload.remarksTrans,
//         permissions: {
//           create: payload.permissions?.map((pms) => {
//             return {
//               permissionId: pms.permissionId,
//               read: pms.read,
//               write: pms.write,
//             }
//           }),
//         },
//       },
//     })

//     return new Response(null, { status: 200 })
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return new Response(JSON.stringify(error.issues), { status: 422 })
//     }

//     return new Response(null, { status: 500 })
//   }
// }
