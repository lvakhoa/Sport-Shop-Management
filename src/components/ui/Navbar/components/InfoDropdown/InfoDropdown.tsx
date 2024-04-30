import React, { MouseEventHandler } from 'react'
import styles from './InfoDropdown.module.css'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export default function InfoDropdown({ closeDropdown }: { closeDropdown: MouseEventHandler }) {
  return (
    <div className="z-10 rounded-lg border border-gray-200 bg-white-100 p-2 shadow-xl max-[468px]:h-screen max-[468px]:w-screen sm:w-[250px] lg:w-[300px]">
      <div className="my-10">
        <div className="flex flex-col items-center">
          <Image
            className="rounded-full sm:size-[50px] lg:size-[100px]"
            src="/assets/images/user.png"
            alt="user"
            width={50}
            height={50}
          />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-lg font-bold">John Cena</span>
          <span className="text-sm text-gray-400">Admin</span>
        </div>
      </div>
      <div className={cn(styles.nav, 'flex flex-col gap-[5px]')}>
        <a
          onClick={closeDropdown}
          href="#admin/pos"
          className="w-full max-[468px]:flex min-[468px]:hidden"
        >
          <Image src="/assets/icons/pos2.svg" alt="pos" width={24} height={24} />
          <span>POS</span>
        </a>
        <a onClick={closeDropdown} href="#admin/profile/edit-profile" className="flex w-full">
          <Image src="/assets/icons/edit.svg" alt="edit" width={24} height={24} />
          <span>Edit Profile</span>
        </a>
        <a onClick={closeDropdown} href="#admin/profile/change-password" className="flex w-full">
          <Image src="/assets/icons/password.svg" alt="password" width={24} height={24} />
          <span>Change Password</span>
        </a>
        <button onClick={closeDropdown} className="flex w-full">
          <Image src="/assets/icons/logout.svg" alt="logout" width={24} height={24} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}
