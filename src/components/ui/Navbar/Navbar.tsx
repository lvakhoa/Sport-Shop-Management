'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { Dispatch, SetStateAction, useState } from 'react'
import styles from './Navbar.module.css'
import { cn } from '@/lib/utils'
import { OutsideDisappear } from '@/components/shared'
import { InfoDropdown } from './components'

export default function Navbar({
  openSidebar,
}: {
  openSidebar: Dispatch<SetStateAction<boolean>>
}) {
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [isInfoClicked, setIsInfoClicked] = useState(false)

  function toggleInfoDropdown() {
    setIsInfoOpen(!isInfoOpen)
  }

  function closeInfoDropdown() {
    setIsInfoClicked(true)
    setIsInfoOpen(false)
  }

  return (
    <header className={cn('fixed left-0 top-0 z-50 w-full bg-white-100 shadow-md')}>
      <nav className={cn(styles.nav, 'nav-wrapper container')}>
        <div className={cn(styles.nav, 'flex items-center justify-between')}>
          <Link href='#/home' className='block'>
            <Image width={128} height={40} src='/assets/images/logo.png' alt='logo' />
          </Link>
          <div className='relative flex items-center gap-4 transition max-[320px]:gap-2'>
            <a className={cn('flex max-[468px]:hidden', styles.navbutton)}>
              <Image src='/assets/icons/pos.svg' alt='pos' width={24} height={24} />
            </a>
            <a
              onClick={() => openSidebar((prev) => !prev)}
              className={cn('flex cursor-pointer', styles.navbutton)}
            >
              <Image src='/assets/icons/sidebar.svg' alt='sidebar' width={20} height={20} />
            </a>
            <div
              onClick={toggleInfoDropdown}
              className='included-node flex cursor-pointer items-center gap-2 rounded-lg'
            >
              <Image
                className='shrink-0 rounded-lg object-cover'
                src='/assets/images/user.png'
                alt='user'
                width={40}
                height={40}
              />

              <div className='flex flex-col gap-[3px] max-[468px]:hidden'>
                <span className='whitespace-nowrap text-left text-sm capitalize leading-none'>
                  Hello
                </span>
                <span className='font-bold leading-none text-black-100'>John Cena</span>
              </div>
            </div>

            {isInfoOpen && (
              <div className='absolute right-0 top-[71px] max-[468px]:right-[-24px]'>
                <OutsideDisappear
                  isForceClose={isInfoClicked}
                  setIsForceClose={setIsInfoClicked}
                  stateChanger={toggleInfoDropdown}
                >
                  <InfoDropdown closeDropdown={closeInfoDropdown} />
                </OutsideDisappear>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
