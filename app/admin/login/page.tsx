'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AdminLogin from './AdminLogin'

export default function LoginPage() {
  const { status } = useSession()
  const router = useRouter()

  // Use useEffect for navigation
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/admin/leads-dashboard')
    }
  }, [status, router])

  if (status === 'authenticated') {
    return null
  }

  return <AdminLogin />
}
