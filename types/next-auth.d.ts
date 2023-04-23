import { User as AuthUser } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import { UserRole, UserStatus } from '@prisma/client'

type UserId = string

declare module 'next-auth/jwt' {
  interface JWT {
    id: UserId
    role: UserRole
    status: UserStatus
  }
}

declare module 'next-auth' {
  interface Session {
    user: User
  }
}

interface User extends AuthUser {
  id: UserId
  role: UserRole
  status: UserStatus
}
