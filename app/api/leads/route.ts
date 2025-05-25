import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { Lead, getLeads, saveLeads } from './data'

// GET /api/leads - Get all leads
export async function GET() {
  const leads = await getLeads()
  return NextResponse.json(leads)
}

// POST /api/leads - Create a new lead
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const newLead: Lead = {
      id: uuidv4(),
      ...body,
      status: 'Pending',
      submittedAt: new Date().toISOString()
    }
    
    const leads = await getLeads()
    leads.push(newLead)
    await saveLeads(leads)
    
    return NextResponse.json(newLead, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}
