import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const intlMiddleware = createMiddleware(routing)

const publicPaths = [
  '/',
  '/vi',
  '/en',
  '/api/quote',
  '/api/contact',
  '/api/apply',
  '/api/services',
  '/api/products',
  '/api/projects',
  '/api/news',
  '/api/site-settings',
  '/admin/login',
]

function isPublicPath(pathname: string): boolean {
  return publicPaths.some(
    (p) => pathname === p || pathname.startsWith(p + '/')
  )
}

function isAdminPath(pathname: string): boolean {
  return pathname.startsWith('/admin') && pathname !== '/admin/login'
}

function isApiAdminPath(pathname: string): boolean {
  return pathname.startsWith('/api/admin')
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Admin routes - check authentication
  if (isAdminPath(pathname) || isApiAdminPath(pathname)) {
    const session = await auth()
    if (!session) {
      if (isApiAdminPath(pathname)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      const url = new URL('/admin/login', request.url)
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }

  // Skip intl for API routes
  if (pathname.startsWith('/api/') || pathname.startsWith('/_next/') || pathname.includes('.')) {
    return NextResponse.next()
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/|uploads/).*)',
  ],
}
