import { MainLayoutComponent, Navbar, Sidebar } from '@/components/ui'
import React from 'react'
import { cn } from '@/lib/utils'

function MainLayout({ children }: { children: React.ReactNode }) {
  return <MainLayoutComponent>{children}</MainLayoutComponent>
}

export default MainLayout
