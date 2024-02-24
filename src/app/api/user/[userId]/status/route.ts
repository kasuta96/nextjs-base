import { UserPublicSchema } from "@/lib/validations/user"
import { z } from "zod"
import { db } from "@/lib/db"
import { checkPermission } from "@/lib/services/permission"

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
    const body = await req.json()
    const { write, user: currentUser } = await checkPermission("user")

    // Check permission
    if (!write) {
      return new Response(null, { status: 403 })
    }

    console.log(
      `[${currentUser.id}]`,
      `updateUserStatus: ${params.userId}`,
      body
    )
    const payload = UserPublicSchema.parse(body)
    console.log("payload", payload)

    // Update user
    const user = await db.user.update({
      where: {
        id: params.userId,
      },
      data: {
        ...payload,
        updatedAt: new Date(),
        updatedUserId: currentUser.id,
      },
    })

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    console.error(error)
    return new Response(null, { status: 500 })
  }
}
