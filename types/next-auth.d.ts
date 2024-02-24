import { User as AuthUser } from "next-auth"
import { JWT } from "next-auth/jwt"
import { Role, SystemRole, UserStatus } from "@prisma/client"

declare module "next-auth/jwt" {
  interface JWT extends SessionUser {
    id: string
    name: string
    email: string | null
  }
}

declare module "next-auth" {
  interface Session {
    user: SessionUser
  }
}

interface AllPermission {
  read: string[]
  write: string[]
}

interface SessionUser {
  id: string
  name: string
  email: string | null
  image?: string | null
  status: UserStatus
  lang: string
  systemRole: SystemRole
  userRoles: (UserRole & { role: Role })[]
  allPermission: AllPermission
}
