'use client'

import { Provider } from 'react-redux'
import { store } from './store'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'styled-components'
import { AuthProvider } from './authContext'
import theme from '@/styles/theme'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <SessionProvider>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </SessionProvider>
    </Provider>
  )
}
