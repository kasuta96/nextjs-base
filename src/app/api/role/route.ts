import { z } from "zod"
import { db } from "@/lib/db"
import { checkPermission } from "@/lib/services/permission"
import { RoleWithPermissionsSchema } from "@/lib/validations/role"

export async function POST(req: Request) {
  try {
    // Ensure user is authentication and has access to this route.
    const { write } = await checkPermission("role")
    if (!write) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const body = await req.json()
    const payload = RoleWithPermissionsSchema.parse(body)

    // Create the role.
    await db.role.create({
      data: {
        name: payload.name,
        nameTrans: payload.nameTrans,
        remarks: payload.remarks,
        remarksTrans: payload.remarksTrans,
        permissions: {
          create: payload.permissions?.map((pms) => {
            return {
              permissionId: pms.permissionId,
              read: pms.read,
              write: pms.write,
            }
          }),
        },
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}
