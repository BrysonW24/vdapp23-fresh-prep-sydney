import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware for Fresh Prep Sydney.
 * Protects /checkout/*, /account/*, and /admin/* routes.
 * Uses a simple session cookie check (not full NextAuth middleware).
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check for session token cookies (NextAuth sets one of these)
  const hasSession =
    request.cookies.has('next-auth.session-token') ||
    request.cookies.has('__Secure-next-auth.session-token')

  // Protected route patterns
  const isProtectedRoute =
    pathname.startsWith('/checkout') ||
    pathname.startsWith('/account') ||
    pathname.startsWith('/admin')

  if (isProtectedRoute && !hasSession) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/checkout/:path*', '/account/:path*', '/admin/:path*'],
}
