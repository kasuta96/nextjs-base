import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/session"
import { activeUserStatus } from "@/lib/constants/auth"
import { ROUTE_403, ROUTE_LOGIN, ROUTE_LOGOUT } from "@/lib/constants/route"
import { db } from "@/lib/db"
import { User } from "@prisma/client"

export async function getActiveUser() {
  const user = await getCurrentUser()
  if (!user) {
    return redirect(ROUTE_LOGOUT)
  }

  if (activeUserStatus.includes(user.status)) return user

  return redirect(ROUTE_403)
}

export async function getUnblockUser() {
  const user = await getCurrentUser()
  if (!user) {
    return redirect(ROUTE_LOGIN)
  }
  return user
}

export async function getUserData(
  userId: User["id"],
  types?: {
    general?: boolean
    private?: boolean
    role?: boolean
    other?: boolean
  }
) {
  const isGeneral = types?.general ?? true
  const isPrivate = types?.private ?? false
  const isRole = types?.role ?? false
  const isOther = types?.other ?? false

  return await db.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      // Public information
      id: isGeneral,
      email: isGeneral,
      name: isGeneral,
      image: isGeneral,
      bio: isGeneral,
      firstName: isGeneral,
      lastName: isGeneral,
      gender: isGeneral,
      dateOfBirth: isGeneral,
      languageCode: isGeneral,
      status: isGeneral,
      // Private information
      phoneNumber: isPrivate,
      zipCode: isPrivate,
      address1: isPrivate,
      address2: isPrivate,
      remarks: isPrivate,
      // Other
      emailVerified: isOther,
      createdAt: isOther,
      updatedAt: isOther,
      updatedUserId: isOther,
      approvedAt: isOther,
      approvedUserId: isOther,
      deletedAt: isOther,
      deletedUserId: isOther,
      accounts: isOther
        ? {
            select: {
              id: true,
              type: true,
              provider: true,
            },
          }
        : false,
      // Role
      role: isRole,
      roles: isRole,
    },
  })
}

export async function getUsers() {
  return await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      firstName: true,
      lastName: true,
      gender: true,
      dateOfBirth: true,
      status: true,
      role: true,
      roles: true,
    },
  })
}
