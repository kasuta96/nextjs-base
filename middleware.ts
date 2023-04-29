import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

const protectedRoutes = ['/dashboard']

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname

    // Manage route protection
    const token = await getToken({ req })
    const isAuth = !!token
    const isAuthPage = pathname.startsWith('/login')

    const isAccessingProtectedRoutes = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    )

    if (isAuthPage) {
      if (isAuth) {
        let from = req.nextUrl.searchParams.get('from')
        return NextResponse.redirect(new URL(from ?? '/dashboard', req.url))
      }

      return NextResponse.next()
    }

    if (!isAuth && isAccessingProtectedRoutes) {
      let from = pathname
      if (req.nextUrl.search) {
        from += req.nextUrl.search
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      )
    }
  },
  {
    callbacks: {
      async authorized() {
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    // Match all request paths except:
    '/((?!api|_next/static|_next/image|favicon.ico|error).*)',
  ],
}
