import { reformPermission } from './services/role'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { db } from '@/lib/db'
import { env } from '~/env.mjs'

const authOptions: AuthOptions = {
  // debug: env.NODE_ENV !== 'production',
  adapter: PrismaAdapter(db as any),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.role = token.role
        session.user.status = token.status
        session.user.lang = token.lang
        session.user.allPermission = token.allPermission
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
        include: {
          roles: {
            include: {
              permissions: true,
            },
          },
        },
      })

      if (!dbUser) {
        token.id = user!.id
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        role: dbUser.role,
        status: dbUser.status,
        lang: dbUser.languageCode,
        allPermission: reformPermission(dbUser.roles),
      }
    },
    redirect({ url }) {
      /**
       * This fix duplicate callbackUrl when has error
       */
      const urlParams = new URLSearchParams(url)
      const error = urlParams.get('error')

      return error ? '' : url
    },
  },
}

export default authOptions
