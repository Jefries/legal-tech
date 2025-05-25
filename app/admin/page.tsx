'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/authContext'

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

  // Show loading state during check
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      Loading...
    </div>
  )
}
