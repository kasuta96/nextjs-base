import { z } from "zod"
import { db } from "@/lib/db"
import { checkPermission } from "@/lib/services/permission"
import {
  UserPrivateSchema,
  UserPublicSchema,
  UserSchema,
} from "@/lib/validations/user"
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

const routeContextSchema = z.object({
  params: z.object({
    userId: z.string(),
    type: z.string(),
  }),
})

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)
    const body = await req.json()
    const { write } = await checkPermission("user")
    const { write: writePrivate } = await checkPermission("user_private")

    switch (params.type) {
      case "general":
        // Check permission
        if (!write) {
          return new Response(null, { status: 403 })
        }
        // Get the request body and validate it.
        const generalPayload = UserPublicSchema.parse(body)
        // Create the user.
        await db.user.update({
          where: {
            id: params.userId,
          },
          data: generalPayload,
        })

        return new Response(null, { status: 200 })

      case "private":
        // Check permission
        if (!writePrivate) {
          return new Response(null, { status: 403 })
        }

        // Get the request body and validate it.
        const privatePayload = UserPrivateSchema.parse(body)
        // Create the user.
        await db.user.update({
          where: {
            id: params.userId,
          },
          data: privatePayload,
        })

        return new Response(null, { status: 200 })

      default:
        return new Response(null, { status: 404 })
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    console.log(error)
    return new Response(null, { status: 500 })
  }
}
