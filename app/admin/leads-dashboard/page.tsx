'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/authContext'
import AdminDashboard from './AdminDashboard'

export default function AdminDashboardPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Check if session exists
    const session = sessionStorage.getItem('adminSession')
    
    // If no session and not authenticated, redirect to login
    if (!session && !isAuthenticated) {
      router.push('/admin/login')
    }
  }, [isAuthenticated, router])

  // Show loading state during auth check
  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        Loading...
      </div>
    )
  }

  return <AdminDashboard />
}
