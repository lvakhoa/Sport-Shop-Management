'use client'

import { cn } from '@/lib/utils'
import Navbar from './Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar'
import { useState } from 'react'
import { ISidebarItem } from '@/configs/sidebarItems'

function MainLayout({
  sidebarItems,
  children,
}: {
  sidebarItems: ISidebarItem[]
  children: React.ReactNode
}) {
  const [openSidebar, setOpenSidebar] = useState(true)

  return (
    <div>
      <Navbar openSidebar={setOpenSidebar} />
      <div className='mt-[--header-height] flex '>
        <div className='fixed z-30'>
          <Sidebar
            sidebarItems={sidebarItems}
            isSidebarVisible={openSidebar}
            openSidebar={setOpenSidebar}
          />
        </div>
        <div
          className={cn(
            'h-auto w-full  pt-[10px]',
            openSidebar ? 'ml-0 sm:ml-sidebar-default' : 'ml-0',
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default MainLayout
