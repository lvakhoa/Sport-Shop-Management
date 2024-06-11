'use client'

import { Navbar, Sidebar } from '@/components/ui'
import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useAuth, useBrowser } from '@/hooks'
import { redirect, usePathname, useRouter } from 'next/navigation'
import { PATH_NAME } from '@/configs'

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const [openSidebar, setOpenSidebar] = useState(true)
  const { isBrowser } = useBrowser()
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoggedIn) {
      return router.replace(PATH_NAME.LOGIN + '?redirect=' + pathname)
    }
  }, [isLoggedIn, router, pathname])

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
            'h-auto w-full bg-gray-50 pt-[10px]',
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
