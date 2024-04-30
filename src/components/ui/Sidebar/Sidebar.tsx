'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Item } from './components'
import { sidebarItems } from '@/configs/sidebarItems'
import styles from './Sidebar.module.css'
import { cn } from '@/lib/utils'
import { useWindowSize } from '@/hooks'

function Sidebar({
  isSidebarVisible,
  openSidebar,
}: {
  isSidebarVisible: boolean
  openSidebar: Dispatch<SetStateAction<boolean>>
}) {
  const windowSize = useWindowSize()

  useEffect(() => {
    openSidebar(windowSize > 1024)
  }, [windowSize, openSidebar])

  return (
    <div
      className={cn(
        styles.scrollbar,
        'h-screen overflow-hidden bg-white-100 shadow-md hover:overflow-auto',
        isSidebarVisible ? 'w-sidebar-compact px-[21px] sm:w-sidebar-default' : 'w-0 px-0',
      )}
    >
      <div className="flex flex-col gap-[10px]">
        {sidebarItems.map((section, index) => (
          <div className="flex flex-col gap-[10px] max-[468px]:gap-[5px]" key={index}>
            {section.title !== 'Main' ? (
              <span className="uppercase text-gray-400 sm:pl-[15px]">{section.title}</span>
            ) : null}
            {section.items.map((item, index) => (
              <Item key={index} icon={item.icon} describe={item.describe} link={item.link} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
