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

    console.error(error)
    return new Response(null, { status: 500 })
  }
}
