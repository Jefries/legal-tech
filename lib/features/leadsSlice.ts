import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Lead {
  id: string
  firstName: string
  lastName: string
  email: string
  linkedInProfile: string
  visasOfInterest: string[]
  resumeUrl: string
  additionalInfo: string
  status: 'Pending' | 'Reached Out'
  submittedAt: string
  country: string
}

interface LeadsState {
  items: Lead[]
  loading: boolean
  error: string | null
}

const initialState: LeadsState = {
  items: [],
  loading: false,
  error: null,
}

export const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    setLeads: (state, action: PayloadAction<Lead[]>) => {
      state.items = action.payload
      state.loading = false
      state.error = null
    },
    addLead: (state, action: PayloadAction<Lead>) => {
      state.items.push(action.payload)
    },
    updateLeadStatus: (state, action: PayloadAction<{ id: string; status: Lead['status'] }>) => {
      const lead = state.items.find(item => item.id === action.payload.id)
      if (lead) {
        lead.status = action.payload.status
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const { setLeads, addLead, updateLeadStatus, setLoading, setError } = leadsSlice.actions
export const leadsReducer = leadsSlice.reducer
