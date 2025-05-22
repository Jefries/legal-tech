'use client'

import { Provider } from 'react-redux'
import { store } from './store'
import { AuthProvider } from './authContext'
import { ThemeProvider } from 'styled-components'
import theme from '@/styles/theme'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  )
}
