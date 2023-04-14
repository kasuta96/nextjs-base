import { User as AuthUser } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import { UserRole } from '@prisma/client'

type UserId = string

declare module 'next-auth/jwt' {
  interface JWT {
    id: UserId
    role: UserRole
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
}
