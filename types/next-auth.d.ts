import { User as AuthUser } from "next-auth"
import { JWT } from "next-auth/jwt"
import { SystemRole, UserStatus } from "@prisma/client"

declare module "next-auth/jwt" {
  interface JWT extends User {
    id: string
    name: string
    email: string
  }
}

declare module "next-auth" {
  interface Session {
    user: User
  }
}

interface AllPermission {
  read: string[]
  write: string[]
}

interface User {
  id: string
  name: string
  email: string
  image?: string | null
  status: UserStatus
  lang: string
  systemRole: SystemRole
  allPermission: AllPermission
}
