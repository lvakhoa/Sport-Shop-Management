'use client'

import { Navbar, Sidebar } from '@/components/ui'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { useBrowser } from '@/hooks'

function MainLayout({ children }: { children: React.ReactNode }) {
  const [openSidebar, setOpenSidebar] = useState(true)
  const { isBrowser } = useBrowser()

  return (
    <div>
      <Navbar openSidebar={setOpenSidebar} />
      <div className='mt-[--header-height] flex '>
        {!!isBrowser && (
          <div className='fixed'>
            <Sidebar isSidebarVisible={openSidebar} openSidebar={setOpenSidebar} />
          </div>
        )}
        <div
          className={cn(
            'h-auto w-full  pt-[10px]',
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
