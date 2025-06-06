'use client'

import { configureStore } from '@reduxjs/toolkit'
import { leadsReducer } from './features/leadsSlice'

export const store = configureStore({
  reducer: {
    leads: leadsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
