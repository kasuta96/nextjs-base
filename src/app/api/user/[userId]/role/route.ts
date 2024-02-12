import { z } from "zod"
import { db } from "@/lib/db"
import { checkPermission } from "@/lib/services/permission"
import { BooleanRecord } from "@/lib/helper"

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
  }),
})

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)
    const body = (await req.json()) as BooleanRecord
    const { write, user: currentUser } = await checkPermission("user")

    // Check permission
    if (!write) {
      return new Response(null, { status: 403 })
    }

    console.log(`[${currentUser.id}]`, `updateUserRole: ${params.userId}`, body)

    for (const [key, val] of Object.entries(body)) {
      let payload = {
        userId: params.userId,
        roleId: key,
      }

      val
        ? await db.userRole.upsert({
            where: { userId_roleId: payload },
            create: payload,
            update: payload,
          })
        : await db.userRole.deleteMany({
            where: payload,
          })
    }

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    console.error(error)
    return new Response(null, { status: 500 })
  }
}
