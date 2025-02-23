import { reformPermission } from "./services/role"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { db } from "@/lib/db"
import { env } from "~/env.mjs"

const authOptions: AuthOptions = {
  // debug: env.NODE_ENV !== 'production',
  adapter: PrismaAdapter(db as any),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
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
        session.user.systemRole = token.systemRole
        session.user.status = token.status
        session.user.lang = token.lang
        session.user.userRoles = token.userRoles
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
          userRoles: {
            include: { role: { include: { permissions: true } } },
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
        status: dbUser.status,
        lang: dbUser.languageCode,
        systemRole: dbUser.systemRole,
        userRoles: dbUser.userRoles,
        allPermission: reformPermission(dbUser.userRoles),
      }
    },
    redirect({ url }) {
      /**
       * This fix duplicate callbackUrl when has error
       */
      const urlParams = new URLSearchParams(url)
      const error = urlParams.get("error")

      return error ? "" : url
    },
  },
}

export default authOptions
