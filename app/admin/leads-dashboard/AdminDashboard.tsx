'use client'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/lib/store'
import { updateLeadStatus, Lead, setLeads, setLoading, setError } from '@/lib/features/leadsSlice'
import {
  AdminContainer,
  Header,
  Title,
  ActionButton,
  TableContainer,
  Table,
  Th,
  Td,
  FilterContainer,
  SearchInput,
  StatusFilter,
  LoadingSpinner,
  ErrorDisplay,
  PaginationContainer,
  PaginationInfo,
  PaginationControls,
  PaginationButton
} from './AdminDashboard.styled'

import { 
  ChevronRight,
  ChevronLeft,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from 'lucide-react'

type SortConfig = {
  key: 'firstName' | 'submittedAt' | 'status' | 'country' | null;
  direction: 'asc' | 'desc';
}

export default function AdminDashboard() {
  const dispatch = useDispatch()
  const { items: leads, loading, error } = useSelector((state: RootState) => state.leads)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'asc'
  })

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        dispatch(setLoading(true))
        const response = await fetch('/api/leads')
        if (!response.ok) {
          throw new Error('Failed to fetch leads')
        }
        const data = await response.json()
        dispatch(setLeads(data))
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : 'Failed to fetch leads'))
      }
    }

    fetchLeads()
  }, [dispatch])

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = 
      lead.firstName.toLowerCase().includes(search.toLowerCase()) ||
      lead.lastName.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleSort = (key: SortConfig['key']) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const getSortIcon = (columnKey: SortConfig['key']) => {
    if (sortConfig.key !== columnKey) return <ArrowUpDown size={16} />
    return sortConfig.direction === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />
  }

  const sortedLeads = [...filteredLeads].sort((a, b) => {
    if (!sortConfig.key) return 0

    let aValue: any = sortConfig.key === 'firstName' 
      ? `${a.firstName} ${a.lastName}`
      : a[sortConfig.key]
    let bValue: any = sortConfig.key === 'firstName'
      ? `${b.firstName} ${b.lastName}`
      : b[sortConfig.key]

    if (sortConfig.key === 'submittedAt') {
      aValue = new Date(aValue).getTime()
      bValue = new Date(bValue).getTime()
    }

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
    return 0
  })

  const totalPages = Math.ceil(sortedLeads.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentLeads = sortedLeads.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  // Calculate visible page numbers
  const getPageNumbers = () => {
    const delta = 1 // Number of pages to show on each side of current page
    const range = []
    const rangeWithDots = []

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  const handleUpdateStatus = async (lead: Lead) => {
    const newStatus = lead.status === 'Pending' ? 'Reached Out' : 'Pending'
    try {
      const response = await fetch(`/api/leads/${lead.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error('Failed to update lead status')
      }

      dispatch(updateLeadStatus({
        id: lead.id,
        status: newStatus
      }))
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Failed to update lead status'))
    }
  }

  return (
    <AdminContainer>
      <Header>
        <Title>Leads</Title>
      </Header>

      {error && <ErrorDisplay>{error}</ErrorDisplay>}

      <FilterContainer>
        <SearchInput
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <StatusFilter
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Reached Out">Reached Out</option>
        </StatusFilter>
      </FilterContainer>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <Th onClick={() => handleSort('firstName')} style={{ cursor: 'pointer' }}>
                    Name <span>{getSortIcon('firstName')}</span>
                  </Th>
                  <Th onClick={() => handleSort('submittedAt')} style={{ cursor: 'pointer' }}>
                    Submitted <span>{getSortIcon('submittedAt')}</span>
                  </Th>
                  <Th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>
                    Status <span>{getSortIcon('status')}</span>
                  </Th>
                  <Th onClick={() => handleSort('country')} style={{ cursor: 'pointer' }}>
                    Country <span>{getSortIcon('country')}</span>
                  </Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {currentLeads.map((lead) => (
                  <tr key={lead.id}>
                    <Td data-label="Name">{`${lead.firstName} ${lead.lastName}`}</Td>
                    <Td data-label="Submitted">{new Date(lead.submittedAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true
                    })}</Td>
                    <Td data-label="Status">{lead.status}</Td>
                    <Td data-label="Country">{lead.country}</Td>
                    <Td data-label="Actions">
                      <ActionButton 
                        onClick={() => handleUpdateStatus(lead)}
                        style={{ backgroundColor: lead.status === 'Pending' ? '#2E7D32' : '#868686' }}
                      >
                        {lead.status === 'Pending' ? 'Mark Reached Out' : 'Mark Pending'}
                      </ActionButton>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableContainer>

          <PaginationContainer>
            <PaginationInfo>
              Showing {startIndex + 1} to {Math.min(endIndex, filteredLeads.length)} of {filteredLeads.length} entries
            </PaginationInfo>
            <PaginationControls>
              <PaginationButton
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
              </PaginationButton>
              
              {getPageNumbers().map((page, index) => (
                typeof page === 'number' ? (
                  <PaginationButton
                    key={index}
                    onClick={() => handlePageChange(page)}
                    disabled={currentPage === page}
                    style={{
                      backgroundColor: currentPage === page ? 'transparent' : '',
                      color: currentPage === page ? '#333' : '',
                      fontWeight: currentPage === page ? 600 : '',
                      border: currentPage === page ? '1px solid #333' : '',
                    }}
                  >
                    {page}
                  </PaginationButton>
                ) : (
                  <span key={index} style={{ margin: '0 0.5rem' }}>{page}</span>
                )
              ))}

              <PaginationButton
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={16} />
              </PaginationButton>
            </PaginationControls>
          </PaginationContainer>
        </>
      )}
    </AdminContainer>
  )
}
