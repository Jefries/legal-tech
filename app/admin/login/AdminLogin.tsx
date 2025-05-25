'use client'

import React, { useState, useEffect } from 'react'
import { Logo } from '@/public/assets/logo'
import { useAuth } from '@/lib/authContext'
import { useSession } from 'next-auth/react'
import {
  Container,
  LoginContainer,
  Title,
  LoginForm,
  InputGroup,
  LoginInput,
  LoginButton,
  ErrorMessage
} from './AdminLogin.styled'

export default function AdminLogin() {
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const { login } = useAuth()
  const { status } = useSession()

  // Only show the form after hydration is complete
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const success = await login(credentials.username, credentials.password)
      if (!success) {
        setError('Invalid username or password')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  // Check for authenticated status
  if (status === 'authenticated') {
    return null // Let the middleware handle the redirect
  }

  // Don't render form until after hydration is complete
  if (!isClient || status === 'loading') {
    return <Container>
      <LoginContainer>
        <Logo width={100} height={40}/>
        <Title>Admin Login</Title>
      </LoginContainer>
    </Container>
  }

  return (
    <Container>
      <LoginContainer>
        <Logo width={100} height={40}/>
        <Title>Admin Login</Title>
        <LoginForm onSubmit={handleSubmit}>
          <InputGroup>
            <label htmlFor="username">Username</label>
            <LoginInput
              type="text"
              id="username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              disabled={isLoading}
              required
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="password">Password</label>
            <LoginInput
              type="password"
              id="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              disabled={isLoading}
              required
            />
          </InputGroup>
          <LoginButton type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </LoginButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </LoginForm>
      </LoginContainer>
    </Container>
  )
}
