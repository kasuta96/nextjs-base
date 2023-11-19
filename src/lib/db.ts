import { env } from "~/env.mjs"
import { PrismaClient } from "@prisma/client"

declare global {
  var cachedPrisma: PrismaClient
}

let prisma: PrismaClient
if (env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient()
  }
  prisma = global.cachedPrisma
}

/***********************************/
/* SOFT DELETE MIDDLEWARE */
/***********************************/

const softDeleteModels = ["User", "Role"]

prisma.$use(async (params, next) => {
  if (params.model && softDeleteModels.includes(params.model)) {
    // Find queries
    if (params.action === "findUnique" || params.action === "findFirst") {
      // Change to findFirst - you cannot filter
      // by anything except ID / unique with findUnique
      params.action = "findFirst"
      // Add 'deletedAt' filter
      // ID filter maintained
      params.args.where["deletedAt"] = null
    }
    if (params.action === "findMany") {
      if (params.args.where) {
        if (params.args.where.deletedAt == undefined) {
          // Exclude deletedAt records if they have not been explicitly requested
          params.args.where["deletedAt"] = null
        }
      } else {
        params.args["where"] = { deletedAt: null }
      }
    }

    // Update queries
    if (params.action == "update") {
      // Change to updateMany - you cannot filter
      // by anything except ID / unique with findUnique
      params.action = "updateMany"
      // Add 'deletedAt' filter
      // ID filter maintained
      params.args.where["deletedAt"] = null
    }
    if (params.action == "updateMany") {
      if (params.args.where != undefined) {
        params.args.where["deletedAt"] = null
      } else {
        params.args["where"] = { deletedAt: null }
      }
    }

    // Delete queries
    if (params.action == "delete") {
      // Change action to an update
      params.action = "update"
      params.args["data"] = { deletedAt: new Date() }
    }
    if (params.action == "deleteMany") {
      // Delete many queries
      params.action = "updateMany"
      if (params.args.data != undefined) {
        params.args.data["deletedAt"] = new Date()
      } else {
        params.args["data"] = { deletedAt: new Date() }
      }
    }
  }
  return next(params)
})

export const db = prisma
