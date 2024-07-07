'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Item } from './components'
import { ISidebarItem } from '@/configs/sidebarItems'
import { cn } from '@/lib/utils'
import { useBrowser, useWindowSize } from '@/hooks'
import { usePathname } from 'next/navigation'
import { PATH_NAME } from '@/configs'

const extractMiddle = (path: string): string => {
  const pathSegments = path.split('/').filter((segment) => segment !== '')
  return `/${pathSegments[0]}`
}

export default function Sidebar({
  sidebarItems,
  isSidebarVisible,
  openSidebar,
}: {
  sidebarItems: ISidebarItem[]
  isSidebarVisible: boolean
  openSidebar: Dispatch<SetStateAction<boolean>>
}) {
  const { isBrowser } = useBrowser()

  return (
    !!isBrowser && (
      <SidebarComponent
        sidebarItems={sidebarItems}
        isSidebarVisible={isSidebarVisible}
        openSidebar={openSidebar}
      />
    )
  )
}

function SidebarComponent({
  sidebarItems,
  isSidebarVisible,
  openSidebar,
}: {
  sidebarItems: ISidebarItem[]
  isSidebarVisible: boolean
  openSidebar: Dispatch<SetStateAction<boolean>>
}) {
  const windowSize = useWindowSize()
  const pathName = usePathname()

  useEffect(() => {
    openSidebar(windowSize > 1024)
  }, [windowSize, openSidebar])

  return (
    <div
      className={cn(
        'scrollbar',
        'max-h-[calc(100vh-var(--header-height))] overflow-hidden bg-white-100 shadow-md hover:overflow-auto',
        isSidebarVisible ? 'w-sidebar-compact px-[21px] sm:w-sidebar-default' : 'w-0 px-0',
      )}
    >
      <div className='flex flex-col gap-[10px]'>
        {sidebarItems.map((section, index) => (
          <div className='flex flex-col gap-[10px] max-[468px]:gap-[5px]' key={index}>
            {section.title !== 'Main' ? (
              <span className='text-[14px] font-medium uppercase text-gray-400'>
                {section.title}
              </span>
            ) : null}
            {section.items.map((item, index) => (
              <Item
                key={index}
                icon={item.icon}
                describe={item.describe}
                link={item.link}
                active={
                  pathName === item.link ||
                  (item.link === PATH_NAME.HOME
                    ? false
                    : extractMiddle(pathName) === extractMiddle(item.link))
                }
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
