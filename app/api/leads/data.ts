import fs from 'fs/promises'
import path from 'path'

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

const leadsFilePath = path.join(process.cwd(), 'app/api/leads/leads.json')

export async function getLeads(): Promise<Lead[]> {
  try {
    const fileContent = await fs.readFile(leadsFilePath, 'utf-8')
    return JSON.parse(fileContent)
  } catch {
    return []
  }
}

export async function saveLeads(updatedLeads: Lead[]): Promise<void> {
  await fs.writeFile(leadsFilePath, JSON.stringify(updatedLeads, null, 2))
}

// Initialize with empty array, data will be loaded from leads.json
export let leads: Lead[] = []

// Initialize leads from the JSON file
getLeads().then(existingLeads => {
  leads = existingLeads
})

