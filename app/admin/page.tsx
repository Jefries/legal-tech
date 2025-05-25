'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/authContext'
import { AdminLoadingSpinner } from '@/components/AdminLoadingSpinner'

export default function AdminPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Only redirect if we're sure about the authentication state
    if (isAuthenticated) {
      router.replace('/admin/leads-dashboard')
    } else {
      router.replace('/admin/login')
    }
  }, [isAuthenticated, router])

  // Show loading spinner during authentication check and redirect
  return <AdminLoadingSpinner />
}
