'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AdminLogin from './AdminLogin'

export default function LoginPage() {
  const { status, data: session } = useSession()
  const router = useRouter()

  // Immediately redirect if session exists
  if (session?.user) {
    router.replace('/admin/leads-dashboard')
    return null
  }

  // Show loading state while checking authentication
  if (status === 'loading') {
    return <div>Loading...</div>
  }

  // Only show login form if explicitly not authenticated
  if (status === 'unauthenticated') {
    return <AdminLogin />
  }

  // Return null for any other state
  return null
}
