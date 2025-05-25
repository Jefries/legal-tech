import { NextResponse } from 'next/server'
import { Lead, getLeads, saveLeads } from '../data'

// GET /api/leads/[id] - Get a specific lead
export async function GET(req: Request) {
  const url = new URL(req.url)
  const id = url.pathname.split('/').pop()
  
  const leads = await getLeads()
  const lead = leads.find((l: Lead) => l.id === id)
  if (!lead) {
    return NextResponse.json(
      { error: 'Lead not found' },
      { status: 404 }
    )
  }
  return NextResponse.json(lead)
}

// PATCH /api/leads/[id] - Update a lead's status
export async function PATCH(req: Request) {
  try {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop()
    
    const leads = await getLeads()
    const lead = leads.find((l: Lead) => l.id === id)
    if (!lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      )
    }

    const body = await req.json()
    if (body.status && ['Pending', 'Reached Out'].includes(body.status)) {
      lead.status = body.status
      try {
        await saveLeads(leads)
        return NextResponse.json(lead)
      } catch (error) {
        console.error('Failed to save leads:', error)
        return NextResponse.json(
          { error: 'Failed to save changes' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Invalid status value' },
      { status: 400 }
    )
  } catch (error) {
    console.error('PATCH error:', error)
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}

// DELETE /api/leads/[id] - Delete a lead
export async function DELETE(req: Request) {
  const url = new URL(req.url)
  const id = url.pathname.split('/').pop()
  
  const leads = await getLeads()
  const index = leads.findIndex((l: Lead) => l.id === id)
  if (index === -1) {
    return NextResponse.json(
      { _error: 'Lead not found' },
      { status: 404 }
    )
  }
  leads.splice(index, 1)
  await saveLeads(leads)
  return new NextResponse(null, { status: 204 })
}