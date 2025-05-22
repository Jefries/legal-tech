'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/authContext'
import AdminLogin from './AdminLogin'

export default function LoginPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const session = sessionStorage.getItem('adminSession')
    
    // If session exists or authenticated, redirect to dashboard
    if (session || isAuthenticated) {
      router.replace('/admin/leads-dashboard')
    }
  }, [isAuthenticated, router])

  // Show loading while checking authentication or redirecting
  if (isAuthenticated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        Redirecting...
      </div>
    )
  }

  return <AdminLogin />
}
