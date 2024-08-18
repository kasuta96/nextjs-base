import * as z from "zod"
import { searchParamsCommon } from "./common"
import { Status } from "@prisma/client"

export const searchTeamParams = searchParamsCommon.extend({
  name: z.string().optional(),
  description: z.string().optional(),
  status: z.string().optional(),
  createdAt: z.string().optional(),
})

export type GetTeamsSchema = z.infer<typeof searchTeamParams>

export const StatusSchema = z.nativeEnum(Status)
export type StatusType = `${z.infer<typeof StatusSchema>}`

export const createTeamSchema = z.object({
  name: z.string(),
  description: z.string(),
  status: StatusSchema,
})

export type CreateTeamSchema = z.infer<typeof createTeamSchema>

export const updateTeamSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  status: StatusSchema.optional(),
})

export type UpdateTeamSchema = z.infer<typeof updateTeamSchema>
