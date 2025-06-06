'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useSession, signIn as nextAuthSignIn, signOut as nextAuthSignOut } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'

interface AuthContextType {
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === 'loading') {
      setIsLoading(true)
    } else {
      setIsAuthenticated(!!session)
      setIsLoading(false)
    }
  }, [session, status])

  // Handle authentication-based redirects only for admin routes
  useEffect(() => {
    if (!isLoading && pathname?.startsWith('/admin')) {
      if (isAuthenticated && pathname?.includes('/login')) {
        // If authenticated and on login page, redirect to dashboard
        router.replace('/admin/leads-dashboard')
      } else if (!isAuthenticated && !pathname?.includes('/login')) {
        // If not authenticated and not on login page, redirect to login
        router.replace('/admin/login')
      }
    }
  }, [isAuthenticated, pathname, router, isLoading])

  const login = async (username: string, password: string) => {
    try {
      const res = await nextAuthSignIn('credentials', {
        username,
        password,
        redirect: false,
      })
      
      if (res?.ok) {
        setIsAuthenticated(true)
        return true
      }
    } catch (error) {
      console.error('Login error:', error)
    }
    return false
  }

  const logout = async () => {
    try {
      await nextAuthSignOut({ 
        callbackUrl: '/admin/login',
        redirect: true 
      })
      setIsAuthenticated(false)
      sessionStorage.removeItem('adminSession')
      router.replace('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
