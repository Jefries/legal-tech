'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AdminDashboard from './AdminDashboard'
import { AdminLoadingSpinner } from '@/components/AdminLoadingSpinner'

export default function AdminDashboardPage() {
  const { status } = useSession()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  if (!isClient || status === 'loading') {
    return <AdminLoadingSpinner />
  }

  if (status === 'unauthenticated') {
    return null
  }

  return <AdminDashboard />
}
