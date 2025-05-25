'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AdminDashboard from './AdminDashboard'
import { AdminLoadingSpinner } from '@/components/AdminLoadingSpinner'

export default function AdminDashboardPage() {
  const router = useRouter()
  const { status, data: session } = useSession()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Show loading spinner while checking session or during client-side hydration
  if (!isClient || status === 'loading') {
    return <AdminLoadingSpinner />
  }

  // If authenticated, always show the dashboard
  if (session) {
    return <AdminDashboard />
  }

  // Only redirect to login if we're absolutely certain there's no session
  if (status === 'unauthenticated') {
    router.replace('/admin/login')
    return null
  }

  // Return null while session state is uncertain
  return null
}
