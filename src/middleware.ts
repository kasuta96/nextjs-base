import { withAuth } from 'next-auth/middleware'
import { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { locales } from '@/lib/i18n'
import { protectedRoutes } from '@/lib/constants/route'

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'en',
})

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  async function onSuccess(req) {
    return intlMiddleware(req)
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
  }
)

export default function middleware(req: NextRequest) {
  // Check protected page (Need authentication)
  const protectedPathnameRegex = RegExp(
    `^(\/(${locales.join('|')}))?(${protectedRoutes.join('|')})(\/.*)?$`,
    'i'
  )
  const isProtectedPage = protectedPathnameRegex.test(req.nextUrl.pathname)

  if (isProtectedPage) {
    return (authMiddleware as any)(req)
  } else {
    return intlMiddleware(req)
  }
}

export const config = {
  matcher: [
    // Match all request paths except:
    '/((?!api|_next|.*\\..*).*)',
  ],
}
