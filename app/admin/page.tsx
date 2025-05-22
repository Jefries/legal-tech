'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/authContext'

export default function AdminPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Check session and auth status
    const session = sessionStorage.getItem('adminSession')
    
    if (session || isAuthenticated) {
      router.push('/admin/leads-dashboard')
    } else {
      router.push('/admin/login')
    }
  }, [isAuthenticated, router])

  // Show loading state during check
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      Loading...
    </div>
  )
}
