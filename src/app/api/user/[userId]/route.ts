import { z } from "zod"
import { db } from "@/lib/db"
import { checkPermission } from "@/lib/services/permission"
import {
  UserPrivateSchema,
  UserPublicSchema,
  UserSchema,
} from "@/lib/validations/user"
import { createSelect, isEmptyObject } from "@/lib/helper"

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

    console.error(error)
    return new Response(null, { status: 500 })
  }
}

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
    const { write: writePrivate } = await checkPermission("user_private")

    // Check permission
    if (!write && !writePrivate) {
      return new Response(null, { status: 403 })
    }
    // Get the request body and validate it.
    let payload = {
      ...UserPublicSchema.parse(body),
      ...(writePrivate && UserPrivateSchema.parse(body)),
    }

    if (isEmptyObject(payload)) {
      return new Response(null, { status: 400 })
    }

    // Create the user.
    await db.user.update({
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
