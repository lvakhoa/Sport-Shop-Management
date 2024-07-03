import { MainLayoutComponent } from '@/components/ui'
import React from 'react'
import { cn } from '@/lib/utils'
import { verifySession } from '@/lib/session'
import { ROLE_TITLE } from '@/configs/enum'
import {
  adminSidebarItems,
  employeeSidebarItems,
  managerSidebarItems,
} from '@/configs/sidebarItems'

async function MainLayout({ children }: { children: React.ReactNode }) {
  const { role } = await verifySession()

  const sidebarItems =
    role === ROLE_TITLE.ADMIN
      ? adminSidebarItems
      : role === ROLE_TITLE.MANAGER
        ? managerSidebarItems
        : employeeSidebarItems

  return <MainLayoutComponent sidebarItems={sidebarItems}>{children}</MainLayoutComponent>
}

export default MainLayout
