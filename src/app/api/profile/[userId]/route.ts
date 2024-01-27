import { z } from "zod"
import { db } from "@/lib/db"
import { ProfileSchema } from "@/lib/validations/user"
import { getServerSession } from "@/lib/session"

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

    // Ensure user is authentication and has access to this user.
    const session = await getServerSession()

    if (!session?.user || params.userId !== session?.user.id) {
      return new Response(null, { status: 403 })
    }

    // Get the request body and validate it.
    const body = await req.json()
    const payload = ProfileSchema.parse(body)

    // Update the user.
    await db.user.update({
      where: {
        id: params.userId,
      },
      data: {
        name: payload.name,
        bio: payload.bio,
        firstName: payload.firstName,
        lastName: payload.lastName,
        gender: payload.gender,
        dateOfBirth: payload.dateOfBirth ? new Date(payload.dateOfBirth) : null,
        phoneNumber: payload.phoneNumber,
        zipCode: payload.zipCode,
        address1: payload.address1,
        address2: payload.address2,
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
