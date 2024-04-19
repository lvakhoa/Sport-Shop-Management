'use client'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Item } from './components'
import { sidebarItems } from '@/configs/sidebarItems'
import styles from './Sidebar.module.css'
import { cn } from '@/lib/utils'
import { useBrowser } from '@/hooks'

function Sidebar({
  isSidebarVisible,
  openSidebar,
}: {
  isSidebarVisible: boolean
  openSidebar: Dispatch<SetStateAction<boolean>>
}) {
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    openSidebar(windowSize > 1024)
  }, [windowSize, openSidebar])

  return (
    <div
      className={cn(
        styles.scrollbar,
        'bg-white-100 overflow-hidden hover:overflow-auto h-screen shadow-md',
        isSidebarVisible ? 'w-sidebar-compact sm:w-sidebar-default px-[21px]' : 'w-0 px-0',
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
