import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const isAdminPage = req.nextUrl.pathname.startsWith('/admin')
    const isLoginPage = req.nextUrl.pathname === '/admin/login'

    // Allow access to login page
    if (isLoginPage) {
      return NextResponse.next()
    }

    // For admin pages, ensure user has admin role
    if (isAdminPage && req.nextauth?.token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: '/admin/login',
    },
  }
)

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/auth/:path*'
  ]
}
