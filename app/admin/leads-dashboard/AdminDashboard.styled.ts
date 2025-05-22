import styled from 'styled-components'

export const AdminContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

export const Title = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
`

export const SearchInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ededed;
  border-radius: 8px;
  width: 300px;
  margin-right: 1rem;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 1rem;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

export const StatusFilter = styled.select`
  padding: 0.5rem;
  border: 1px solid #ededed;
  border-radius: 8px;
  margin-right: 1rem;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 1rem;
  }
`

export const TableContainer = styled.div`
  position: relative;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  
  @media (min-width: 769px) {
    background: transparent;
    border: 1px solid #ededed;
    border-radius: 1rem 1rem 0 0;
    background-repeat: no-repeat;
    background-size: 40px 100%, 40px 100%, 14px 100%, 14px 100%;
    background-position: 0 0, 100% 0, 0 0, 100% 0;
    background-attachment: local, local, scroll, scroll;
  }

  @media (max-width: 768px) {
    overflow-x: visible;
    background: none;
  }
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  @media (min-width: 769px) {
    min-width: 800px;
    font-size: 0.9rem;

    tbody {
      tr {
        border-bottom: 1px solid #ededed;

        &:hover {
          background-color: #f5f5f5;
        }

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }

  @media (max-width: 768px) {
    display: block;
    
    thead {
      display: none;
    }
    
    tbody {
      display: block;
    }
    
    tr {
      display: grid;
      grid-gap: 0.5rem;
      background: white;
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    td {
      display: grid;
      grid-template-columns: 120px 1fr;
      align-items: center;
      padding: 0.5rem;
      border-bottom: 1px solid #ededed;
      
      &:last-child {
        border-bottom: none;
      }
      
      &:before {
        content: attr(data-label);
        font-weight: 600;
        color: #666;
      }

      &[data-label="Actions"] {
        grid-template-columns: 1fr;
        justify-items: start;
        padding-top: 0.5rem;
        
        &:before {
          display: none;
        }
      }
    }
  }
`

export const Th = styled.th`
  text-align: left;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.secondary};
  opacity: 0.8;
  padding: 1rem;
  border-bottom: 1px solid #ededed;
  white-space: nowrap;
  transition: background-color 0.2s;
  user-select: none;
  position: sticky;
  top: 0;
  z-index: 1;

  &:hover {
    background-color: #f5f5f5;
  }

  span {
    margin-left: 0.5rem;
    font-size: 0.8rem;
    opacity: 0.6;
    vertical-align: sub;
  }
`

export const Td = styled.td`
  padding: 1rem;
  
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`

export const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  cursor: pointer;
  white-space: nowrap;
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.secondary};
    cursor: not-allowed;
  }
  
  @media (max-width: 1024px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
`

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  
  &:after {
    content: '';
    width: 32px;
    height: 32px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

export const ErrorDisplay = styled.div`
  color: ${({ theme }) => theme.colors.error};
  padding: 1rem;
  margin: 1rem 0;
  background-color: #fff5f5;
  border-radius: 4px;
  text-align: center;
`

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ededed;
  border-radius: 1rem;
  padding: 16px;
  gap: 1rem;
  flex-wrap: wrap;

  @media (min-width: 769px) {
    border-radius: 0 0 1rem 1rem;
    border-top: none;
  }
`

export const PaginationInfo = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 0.875rem;
`

export const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  white-space: nowrap;
  
  &:disabled {
    color: ${({ theme }) => theme.colors.secondary};
    cursor: not-allowed;
  }
  
  @media (max-width: 1024px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
`

export const PaginationControls = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;

  ${PaginationButton} {
    min-width: 32px;
    height: 32px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;

    &:disabled {
      background-color: none;
      color: #868686;
    }
  }
`

export const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`