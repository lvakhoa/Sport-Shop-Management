'use client'

import { Navbar, Sidebar } from '@/components/ui'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { useBrowser } from '@/hooks'

function MainLayout({ children, info }: { children: React.ReactNode; info: React.ReactNode }) {
  const [openSidebar, setOpenSidebar] = useState(true)
  const { isBrowser } = useBrowser()

  return (
    <div>
      <Navbar openSidebar={setOpenSidebar} />
      <div className="mt-[--header-height] flex">
        {!!isBrowser && (
          <div className="fixed">
            <Sidebar isSidebarVisible={openSidebar} openSidebar={setOpenSidebar} />
          </div>
        )}
        <div
          className={cn(
            'h-screen w-full bg-gray-50 pl-[1.5rem] pt-[10px] sm:pl-[2.25rem]',

            openSidebar ? 'ml-sidebar-compact sm:ml-sidebar-default' : 'ml-0',
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default MainLayout
