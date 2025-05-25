import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const isAdminPage = req.nextUrl.pathname.startsWith('/admin')
    const isLoginPage = req.nextUrl.pathname === '/admin/login'
    const isDashboardPage = req.nextUrl.pathname === '/admin/leads-dashboard'
    const token = req.nextauth.token

    // If user has a valid admin session
    if (token?.role === 'admin') {
      // Redirect to dashboard if trying to access login page
      if (isLoginPage) {
        return NextResponse.redirect(new URL('/admin/leads-dashboard', req.url))
      }
      // Allow access to all admin pages
      return NextResponse.next()
    }

    // If no token or not admin role
    if (isAdminPage && !isLoginPage) {
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
