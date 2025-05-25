'use client'

import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`

const Spinner = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #2563eb;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`

export const AdminLoadingSpinner = () => {
  return (
    <LoaderContainer>
      <Spinner />
    </LoaderContainer>
  )
}

export default AdminLoadingSpinner
