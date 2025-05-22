'use client'

import styled from 'styled-components'

const SettingsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
     padding: 3rem 1rem;
  }
`

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #333;
`

const Card = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;

  svg {
    color: #999;
    margin-bottom: 1rem;
    width: 3rem;
    height: 3rem;
  }
`

const EmptyStateText = styled.p`
  margin: 0;
  font-size: 0.875rem;
`

export default function SettingsPage() {
  return (
    <SettingsContainer>
      <Title>Settings</Title>
      <Card>
        <EmptyState>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
            />
          </svg>
          <EmptyStateText>Settings page is under construction</EmptyStateText>
        </EmptyState>
      </Card>
    </SettingsContainer>
  )
}