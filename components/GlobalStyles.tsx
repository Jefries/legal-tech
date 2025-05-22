'use client'

import styled from 'styled-components'

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  padding: 2rem;
`

export const FormContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
`

export const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`

export const Title = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2rem;
  font-weight: 500;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const Label = styled.label`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`

export const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &[type="file"] {
    padding: 0.5rem;
    font-size: 0.875rem;
  }
`

export const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

export const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  font-family: inherit;

  &[multiple] {
    height: 120px;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-family: inherit;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primary}DD;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.secondary};
    cursor: not-allowed;
  }
`

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`

export const SuccessMessage = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.lightGreen};
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
`
