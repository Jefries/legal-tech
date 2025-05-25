'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/authContext'
import { usePathname } from 'next/navigation'
import styled from 'styled-components'
import Link from 'next/link'
import { Logo } from '@/public/assets/logo'

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  position: relative;
`

const Sidebar = styled.aside`
  width: 250px;
  background: white;
  background-image: url('/assets/bg-sidebar.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-right: 1px solid #ededed;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 6rem 1rem 1rem 1rem;
    transform: translateX(-100%);
    &.active {
      transform: translateX(0);
    }
  }
`

const MainContent = styled.main`
  flex: 1;
  margin-left: 250px;
  padding: 2rem;
  background-color: #fff;
  min-height: 100vh;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
  }
`

const SidebarLink = styled(Link)<{ $isActive?: boolean }>`
  color: ${props => props.$isActive ? '#333' : '#a0a0a0'};
  font-weight: ${props => props.$isActive ? '600' : '#300'};
  text-decoration: none;
  padding: 0.75rem 0;
  border-radius: 0.5rem;
  transition: all 0.2s ease-in-out;
  font-size: 1rem;

  &:hover {
    color: #333;
  }
`

const MenuButton = styled.button`
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1001;
  background: ${({ theme }) => theme.colors.foreground};
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: 300;
  padding: 0.5rem;
  width: 40px;
  height: 40px;
  color: white;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const Overlay = styled.div<{ $isVisible: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    opacity: ${props => props.$isVisible ? 1 : 0};
    pointer-events: ${props => props.$isVisible ? 'auto' : 'none'};
    transition: opacity 0.3s ease-in-out;
  }
`

const ProfileMenu = styled.div`
    display: flex;
    flex-flow: row;
    align-items: center;
    cursor: pointer;
    position: relative;
`

const DropdownMenu = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  bottom: 48px;
  right: 0;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: ${props => props.$isVisible ? 'block' : 'none'};
  padding: 0.5rem 0;
width: 100%;
`

const DropdownItem = styled.button`
  width: 100%;
  padding: 0.5rem 1rem;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: #333;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { logout, isAuthenticated } = useAuth()
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    // Close sidebar on mobile when route changes
    setIsSidebarOpen(false)
  }, [pathname])

  // Return early for login page or unauthenticated state
  if (pathname?.includes('/login') || !isAuthenticated) {
    return <>{children}</>
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <LayoutContainer>
      <MenuButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? '✕' : '☰'}
      </MenuButton>
      
      <Overlay 
        $isVisible={isSidebarOpen} 
        onClick={() => setIsSidebarOpen(false)}
      />
      
      <Sidebar className={isSidebarOpen ? 'active' : ''}>
        <div>
            <Logo width={100} height={30}/>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: 60 }}>
            <SidebarLink href="/admin/leads-dashboard" $isActive={pathname === '/admin/leads-dashboard'}>
                Leads
            </SidebarLink>
            <SidebarLink href="/admin/settings" $isActive={pathname === '/admin/settings'}>
                Settings
            </SidebarLink>
            </nav>
        </div>

        <ProfileMenu onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <div style={{ 
                width: 36, 
                height: 36, 
                borderRadius: '50%', 
                backgroundColor: '#E0E0E0', 
                fontSize: '0.8rem',
                fontWeight: 600,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                A
            </div>
            <span style={{ marginLeft: '0.5rem', fontSize: '1rem', fontWeight: 600, }}>Admin</span>
                      
                <DropdownMenu $isVisible={isDropdownOpen}>
                <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                </DropdownMenu>
            </ProfileMenu>
      </Sidebar>
      
      <MainContent onClick={() => isSidebarOpen && setIsSidebarOpen(false)}>
        {children}
      </MainContent>
    </LayoutContainer>
  )
}
