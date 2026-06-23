import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const intlMiddleware = createMiddleware(routing)

function isAdminPath(pathname: string): boolean {
  return pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')
}

function isApiAdminPath(pathname: string): boolean {
  return pathname.startsWith('/api/admin')
}

function hasSession(request: NextRequest): boolean {
  // NextAuth v5 cookie names (check both secure and non-secure variants)
  const cookies = request.cookies
  return !!(
    cookies.get('__Secure-authjs.session-token') ||
    cookies.get('authjs.session-token') ||
    cookies.get('next-auth.session-token') ||
    cookies.get('__Secure-next-auth.session-token')
  )
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Admin routes - check session cookie (Edge-compatible, no JWT decode needed)
  if (isAdminPath(pathname) || isApiAdminPath(pathname)) {
    if (!hasSession(request)) {
      if (isApiAdminPath(pathname)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      const url = new URL('/admin/login', request.url)
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }

  // Skip intl for API routes, admin routes, and static files
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/_next/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/|uploads/).*)',
  ],
}
