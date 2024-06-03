'use client'

import { Navbar, Sidebar } from '@/components/ui'
import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useAuth, useBrowser } from '@/hooks'
import { redirect } from 'next/navigation'
import { PATH_NAME } from '@/configs'

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const [openSidebar, setOpenSidebar] = useState(true)
  const { isBrowser } = useBrowser()
  const { accessToken } = useAuth()

  // useEffect(() => {
  //   if (!accessToken) {
  //     return redirect(PATH_NAME.LOGIN)
  //   }
  // }, [accessToken])

  return (
    <div>
      <Navbar openSidebar={setOpenSidebar} />
      <div className='mt-[--header-height] flex'>
        {!!isBrowser && (
          <div className='fixed'>
            <Sidebar isSidebarVisible={openSidebar} openSidebar={setOpenSidebar} />
          </div>
        )}
        <div
          className={cn(
            'h-screen w-full bg-gray-50 pt-[10px]',

            openSidebar ? 'ml-sidebar-compact sm:ml-sidebar-default' : 'ml-0 flex justify-center',
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default ProtectedLayout
