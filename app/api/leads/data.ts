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

const STATIC_LEADS_PATH = path.join(process.cwd(), 'app/api/leads/leads.json')
const TEMP_LEADS_PATH = path.join(DATA_DIR, 'leads.json')

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
    // First try to read from the temporary file
    const fileContent = await fs.readFile(TEMP_LEADS_PATH, 'utf-8')
    return JSON.parse(fileContent)
  } catch {
    try {
      // If temp file doesn't exist, try to read from static file
      const staticContent = await fs.readFile(STATIC_LEADS_PATH, 'utf-8')
      const leads = JSON.parse(staticContent)
      // Save to temp file for future updates
      await saveLeads(leads)
      return leads
    } catch {
      // If neither file exists, create empty array
      await saveLeads([])
      return []
    }
  }
}

export async function saveLeads(updatedLeads: Lead[]): Promise<void> {
  await ensureDataDir()
  await fs.writeFile(TEMP_LEADS_PATH, JSON.stringify(updatedLeads, null, 2))
  
  // In development, also update the static file
  if (process.env.NODE_ENV !== 'production') {
    await fs.writeFile(STATIC_LEADS_PATH, JSON.stringify(updatedLeads, null, 2))
  }
}

// Initialize with empty array, data will be loaded from leads.json
export let leads: Lead[] = []

// Initialize leads from the JSON file
getLeads().then(existingLeads => {
  leads = existingLeads
})

