'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { Dispatch, SetStateAction, useState } from 'react'
import styles from './Navbar.module.css'
import { cn } from '@/lib/utils'
import { OutsideDisappear, Skeleton } from '@/components/shared'
import { InfoDropdown } from './components'
import { useProfile } from '@/hooks'
import { PATH_NAME } from '@/configs'

export default function Navbar({
  openSidebar,
}: {
  openSidebar: Dispatch<SetStateAction<boolean>>
}) {
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [isInfoClicked, setIsInfoClicked] = useState(false)
  const profile = useProfile()

  const fullName = profile.data?.fullname
  const lastSpaceIndex = fullName?.lastIndexOf(' ') ?? 0
  const middleSpaceIndex = fullName?.substring(0, lastSpaceIndex).lastIndexOf(' ') ?? 0
  const displayName = !!fullName
    ? `${fullName?.substring(middleSpaceIndex, lastSpaceIndex)} ${fullName?.substring(lastSpaceIndex + 1)}`
    : undefined

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
          <Link href={PATH_NAME.HOME} className='block'>
            <Image width={128} height={40} src='/assets/images/logo.png' alt='logo' />
          </Link>
          <div className='relative flex items-center gap-4 transition max-[320px]:gap-2'>
            <Link
              href={PATH_NAME.POS}
              className={cn('flex cursor-pointer max-[468px]:hidden', styles.navbutton)}
            >
              <Image src='/assets/icons/pos.svg' alt='pos' width={24} height={24} />
            </Link>
            <div
              onClick={() => openSidebar((prev) => !prev)}
              className={cn('flex cursor-pointer', styles.navbutton)}
            >
              <Image src='/assets/icons/sidebar.svg' alt='sidebar' width={20} height={20} />
            </div>
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
                {profile.isLoading || !displayName ? (
                  <Skeleton className='h-[16px] w-[80px] rounded-full' />
                ) : (
                  <span className='font-bold leading-none text-black-100'>{displayName}</span>
                )}
              </div>
            </div>

            {isInfoOpen && (
              <div className='absolute right-0 top-[71px] max-[468px]:right-[-24px]'>
                <OutsideDisappear
                  isForceClose={isInfoClicked}
                  setIsForceClose={setIsInfoClicked}
                  stateChanger={toggleInfoDropdown}
                >
                  <InfoDropdown
                    isLoading={profile.isLoading}
                    name={profile.data?.fullname ?? ''}
                    closeDropdown={closeInfoDropdown}
                  />
                </OutsideDisappear>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
