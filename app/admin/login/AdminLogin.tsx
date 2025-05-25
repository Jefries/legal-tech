'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/authContext'
import styled from 'styled-components'
import { Logo } from '@/public/assets/logo'


const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoginContainer = styled.div`
  width: 400px;
  margin: 4rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #ededed;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  svg {
    display: flex;
    margin: 0 auto 2rem;
  }
`

const Title = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2rem;
`

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const LoginInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
`

const LoginButton = styled.button`
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.colors.primary};
  font-size: 1rem;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.secondary};
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme.colors.primary}DD;
  }
`

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  margin-top: 0.5rem;
`

export default function AdminLogin() {
  const { login } = useAuth()
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      const success = await login(username, password)
      if (success) {
        // Redirect to admin-dashboard after successful login
        router.push('/admin/leads-dashboard')
      } else {
        setError('Invalid credentials')
      }
    } catch {
      setError('An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <LoginContainer>
        <Logo width={100} height={40}/>
        <Title>Admin Login</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <LoginForm onSubmit={handleSubmit}>
          <LoginInput
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <LoginInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoginButton type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </LoginButton>
        </LoginForm>
      </LoginContainer>
    </Container>
  )
}
