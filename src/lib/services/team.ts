"use server"

import { db } from "@/lib/db"
import {
  CreateTeamSchema,
  GetTeamsSchema,
  UpdateTeamSchema,
} from "@/lib/validations/team"
import { Prisma, Status, Team } from "@prisma/client"
import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import { getErrorMessage } from "@/lib/handle-error"
import { checkPermission } from "./permission"

export async function getTeams(input: GetTeamsSchema) {
  noStore()
  const {
    page,
    per_page,
    sort,
    operator,
    createdAt,
    name,
    description,
    status,
  } = input

  try {
    // Offset to paginate the results
    const offset = (page - 1) * per_page
    // Column and order to sort by
    const [column, order] = (sort?.split(".").filter(Boolean) ?? [
      "createdAt",
      "desc",
    ]) as [keyof Prisma.TeamOrderByWithRelationInput, Prisma.SortOrder]

    const statusArray = status
      ? status.split(".").map((s) => s as Status)
      : undefined

    // Convert the date strings to date objects
    const [from, to] = createdAt ? createdAt.split("~", 2) : []
    const fromDay = from ? new Date(from) : undefined
    const toDay = to ? new Date(to) : new Date()

    // Construct where conditions
    const conditions: Prisma.TeamWhereInput[] = [
      name && { name: { contains: name } },
      status && { status: { in: statusArray } },
      description && { description: { contains: description } },
      fromDay && toDay && { createdAt: { gte: fromDay, lte: toDay } },
    ].filter(Boolean) as Prisma.TeamWhereInput[]

    const where = operator === "or" ? { OR: conditions } : { AND: conditions }

    // Transaction is used to ensure both queries are executed in a single transaction
    const [data, total] = await db.$transaction([
      db.team.findMany({
        where,
        skip: offset,
        take: per_page,
        orderBy: column ? { [column]: order } : { id: "desc" },
      }),
      db.team.count({ where }),
    ])

    const pageCount = Math.ceil(total / per_page)
    return { data, pageCount }
  } catch (err) {
    console.error(err)
    return { data: [], pageCount: 0 }
  }
}

export async function createTeam(input: CreateTeamSchema) {
  noStore()
  const { write, user: currentUser } = await checkPermission("team")
  if (!write) {
    return {
      data: null,
      error: "You do not have permission to create a team",
    }
  }

  try {
    await db.$transaction(async (tx) => {
      const newTeam = await tx.team.create({
        data: {
          name: input.name,
          description: input.description,
          status: input.status,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        },
        select: {
          id: true,
        },
      })
      return newTeam
    })

    revalidatePath("/")
    console.log(`[${currentUser.id}]`, `createTeam`, input)

    return {
      data: null,
      error: null,
    }
  } catch (err) {
    console.error(err)
    return {
      data: null,
      error: getErrorMessage(err),
    }
  }
}

export async function updateTeam(input: UpdateTeamSchema & { id: string }) {
  noStore()
  const { write, user: currentUser } = await checkPermission("team")
  if (!write) {
    return {
      data: null,
      error: "You do not have permission to update a team",
    }
  }

  try {
    await db.team.update({
      where: { id: input.id },
      data: {
        name: input.name,
        description: input.description,
        status: input.status,
        updatedAt: new Date(),
        updatedBy: currentUser.id,
      },
    })

    revalidatePath("/")
    console.log(`[${currentUser.id}]`, `updateTeam`, input)

    return {
      data: null,
      error: null,
    }
  } catch (err) {
    console.error(err)
    return {
      data: null,
      error: getErrorMessage(err),
    }
  }
}

export async function updateTeams(input: {
  ids: string[]
  name?: Team["name"]
  description?: Team["description"]
  status?: Team["status"]
}) {
  noStore()
  const { write, user: currentUser } = await checkPermission("team")
  if (!write) {
    return {
      data: null,
      error: "You do not have permission to update a team",
    }
  }

  try {
    await db.team.updateMany({
      where: {
        id: {
          in: input.ids,
        },
      },
      data: {
        name: input.name,
        description: input.description,
        status: input.status,
        updatedAt: new Date(),
        updatedBy: currentUser.id,
      },
    })

    revalidatePath("/")
    console.log(`[${currentUser.id}]`, `updateTeams`, input)

    return {
      data: null,
      error: null,
    }
  } catch (err) {
    console.error(err)
    return {
      data: null,
      error: getErrorMessage(err),
    }
  }
}

export async function deleteTeams(input: { ids: string[] }) {
  const { write, user: currentUser } = await checkPermission("team")
  if (!write) {
    return {
      data: null,
      error: "You do not have permission to delete a team",
    }
  }

  try {
    await db.$transaction(async (tx) => {
      // Delete teams
      await tx.team.updateMany({
        where: {
          id: {
            in: input.ids,
          },
        },
        data: {
          deletedAt: new Date(),
          deletedBy: currentUser.id,
        },
      })
    })

    revalidatePath("/")
    console.log(`[${currentUser.id}]`, `deleteTeams`, input)

    return {
      data: null,
      error: null,
    }
  } catch (err) {
    console.error(err)
    return {
      data: null,
      error: getErrorMessage(err),
    }
  }
}
