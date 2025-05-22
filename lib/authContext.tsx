'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check session on initial load
  useEffect(() => {
    const checkSession = () => {
      const session = sessionStorage.getItem('adminSession')
      if (session) {
        setIsAuthenticated(true)
      }
    }

    // Check session when component mounts
    checkSession()

    // Listen for storage events (for multi-tab support)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'adminSession') {
        setIsAuthenticated(!!e.newValue)
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const login = async (username: string, password: string) => {
    // This is Just Mock authentication - in a real app, this would be an API call
    if (username === 'admin' && password === '123') {
      setIsAuthenticated(true)
      // Store session
      sessionStorage.setItem('adminSession', 'true')
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    // Clear session
    sessionStorage.removeItem('adminSession')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
