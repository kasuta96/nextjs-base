import { z } from "zod"
import { db } from "@/lib/db"
import { checkPermission } from "@/lib/services/permission"
import { RoleWithPermissionsSchema } from "@/lib/validations/role"

const routeContextSchema = z.object({
  params: z.object({
    roleId: z.string(),
  }),
})

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    // Check write permission
    const { write } = await checkPermission("role")
    if (!write) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const body = await req.json()
    const payload = RoleWithPermissionsSchema.parse(body)

    // Update the role.
    await db.role.update({
      where: {
        id: params.roleId,
      },
      data: {
        name: payload.name,
        nameTrans: payload.nameTrans,
        remarks: payload.remarks,
        remarksTrans: payload.remarksTrans,
      },
    })

    // Update the role permissions.
    payload.permissions?.map(async (pms) => {
      await db.rolePermissions.update({
        where: {
          roleId_permissionId: {
            roleId: params.roleId,
            permissionId: pms.permissionId,
          },
        },
        data: {
          read: pms.read,
          write: pms.write,
        },
      })
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    // Check write permission
    const { write } = await checkPermission("role")
    if (!write) {
      return new Response(null, { status: 403 })
    }

    // Delete the role.
    await db.role.delete({
      where: {
        id: params.roleId,
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
