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
    <header className={cn('fixed z-50 w-full top-0 left-0 bg-white-100 shadow-md')}>
      <nav className={cn(styles.nav, 'nav-wrapper container')}>
        <div className={cn(styles.nav, 'flex justify-between items-center')}>
          <Link href="#/home" className="block">
            <Image width={128} height={40} src="/assets/images/logo.png" alt="logo" />
          </Link>
          <div className="flex items-center max-[320px]:gap-2 gap-4 transition relative">
            <a className={cn('max-[468px]:hidden flex', styles.navbutton)}>
              <Image src="/assets/icons/pos.svg" alt="pos" width={24} height={24} />
            </a>
            <a
              onClick={() => openSidebar((prev) => !prev)}
              className={cn('cursor-pointer flex', styles.navbutton)}
            >
              <Image src="/assets/icons/sidebar.svg" alt="sidebar" width={20} height={20} />
            </a>
            <div
              onClick={toggleInfoDropdown}
              className="included-node cursor-pointer flex items-center rounded-lg gap-2"
            >
              <Image
                className="flex-shrink-0 object-cover rounded-lg"
                src="/assets/images/user.png"
                alt="user"
                width={40}
                height={40}
              />

              <div className="max-[468px]:hidden flex flex-col gap-[3px]">
                <span className="whitespace-nowrap text-sm capitalize text-left leading-none">
                  Hello
                </span>
                <span className="font-bold text-black-100 leading-none">John Cena</span>
              </div>
            </div>

            {isInfoOpen && (
              <div className="absolute max-[468px]:right-[-24px] right-0 top-[71px]">
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
