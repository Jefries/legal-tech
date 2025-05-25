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

const DATA_DIR = process.env.NODE_ENV === 'production' 
  ? '/tmp/data'  // Use /tmp in production for writable storage
  : path.join(process.cwd(), 'app/api/leads')

const leadsFilePath = path.join(DATA_DIR, 'leads.json')

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR)
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true })
  }
}

export async function getLeads(): Promise<Lead[]> {
  await ensureDataDir()
  try {
    const fileContent = await fs.readFile(leadsFilePath, 'utf-8')
    return JSON.parse(fileContent)
  } catch {
    // If file doesn't exist, create it with empty array
    await saveLeads([])
    return []
  }
}

export async function saveLeads(updatedLeads: Lead[]): Promise<void> {
  await ensureDataDir()
  await fs.writeFile(leadsFilePath, JSON.stringify(updatedLeads, null, 2))
}

// Initialize with empty array, data will be loaded from leads.json
export let leads: Lead[] = []

// Initialize leads from the JSON file
getLeads().then(existingLeads => {
  leads = existingLeads
})

