'use client'

import React, { useState, useEffect } from 'react'
import { Logo } from '@/public/assets/logo'
import { useAuth } from '@/lib/authContext'
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
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const { login } = useAuth()

  // Only show the form after hydration is complete
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const success = await login(credentials.username, credentials.password)
      if (!success) {
        setError('Invalid username or password')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('An error occurred during login')
    }
  }

  // Don't render form until after hydration is complete
  if (!isClient) {
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
              required
            />
          </InputGroup>
          <LoginButton type="submit">
            Login
          </LoginButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </LoginForm>
      </LoginContainer>
    </Container>
  )
}
