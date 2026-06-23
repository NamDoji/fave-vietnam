import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const intlMiddleware = createMiddleware(routing)

function isAdminPath(pathname: string): boolean {
  return pathname.startsWith('/admin') && pathname !== '/admin/login'
}

function isApiAdminPath(pathname: string): boolean {
  return pathname.startsWith('/api/admin')
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Admin routes - check JWT token (Edge-compatible)
  if (isAdminPath(pathname) || isApiAdminPath(pathname)) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET || 'fallback-secret',
    })
    if (!token) {
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
