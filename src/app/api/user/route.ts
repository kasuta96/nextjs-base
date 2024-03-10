import { z } from "zod"
import { db } from "@/lib/db"
import { checkPermission } from "@/lib/services/permission"
import { UserSchema } from "@/lib/validations/user"
import { createSelect } from "@/lib/helper"
import { Prisma } from "@prisma/client"

const routeParamSchema = z.object({
  page: z.number().int().min(0),
  size: z.number().int().min(1),
  keyword: z.string().optional(),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const params = routeParamSchema.parse({
      page: Number(searchParams.get("page")) ?? 1,
      size: Number(searchParams.get("size")) ?? 10,
    })

    // Check permission
    const userPublicPms = await checkPermission("user")
    const userPrivatePms = await checkPermission("user")
    if (!userPublicPms.read && !userPrivatePms.read) {
      return new Response(null, { status: 403 })
    }

    const query: Prisma.UserFindManyArgs = {
      orderBy: {
        updatedAt: "desc",
      },
    }

    const [users, count] = await db.$transaction([
      db.user.findMany({
        select: createSelect(UserSchema),
        skip: params.page * params.size,
        take: params.size,
        ...query,
      }),
      db.user.count({ where: query.where }),
    ])

    return new Response(
      JSON.stringify({
        rows: users,
        pageCount: Math.ceil(count / params.size),
        rowCount: count,
      }),
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    console.error(error)
    return new Response(null, { status: 500 })
  }
}
