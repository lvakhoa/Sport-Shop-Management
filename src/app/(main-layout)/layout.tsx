import { MainLayoutComponent } from '@/components/ui'
import React from 'react'
import { cn } from '@/lib/utils'
import { verifySession } from '@/lib/session'
import {
  adminSidebarItems,
  employeeSidebarItems,
  managerSidebarItems,
} from '@/configs/sidebarItems'
import { ROLE_NAME } from '@/configs/enum'

async function MainLayout({ children }: { children: React.ReactNode }) {
  const { role } = await verifySession()

  const sidebarItems = role === ROLE_NAME.ADMIN ? adminSidebarItems : employeeSidebarItems

  return <MainLayoutComponent sidebarItems={sidebarItems}>{children}</MainLayoutComponent>
}

export default MainLayout
