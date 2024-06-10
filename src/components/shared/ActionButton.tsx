import { cn } from '@/lib/utils'
import Image from 'next/image'
import React, { ReactElement } from 'react'
import { Button } from './button'
import { useRouter } from 'next/navigation'
import { TABLE_ACTION_TYPE } from '@/configs/enum'
import AlertPopup from './AlertPopup'
import SidebarEdit from './SidebarEdit'
import { UseMutateFunction } from '@tanstack/react-query'

interface IActionButton {
  background: string
  color?: string
  icon: string
  alt: string
  type: TABLE_ACTION_TYPE
  id: string
  path?: string
  editContentElement?: ReactElement
  deleteMethod: UseMutateFunction<string | undefined, Error, void, unknown>
}

function ActionButton({
  background,
  color,
  icon,
  alt,
  type,
  path,
  id,
  editContentElement,
  deleteMethod,
}: IActionButton) {
  const router = useRouter()

  switch (type) {
    case 'DELETE':
      return (
        <AlertPopup title='Delete?' description='Are you sure?' action={deleteMethod}>
          <Button
            className={cn('h-[30px] w-[30px] rounded-[3px] p-[5px]')}
            style={{ backgroundColor: background }}
          >
            <Image width={20} height={20} src={icon} alt={alt} style={{ color }} />
          </Button>
        </AlertPopup>
      )
    case 'EDIT':
      return (
        <SidebarEdit
          title='Edit Profile'
          description='Make changes to profile here. Click save when you are done.'
          content={editContentElement}
        >
          <Button
            className={cn('h-[30px] w-[30px] rounded-[3px] p-[5px]')}
            style={{ backgroundColor: background }}
          >
            <Image width={20} height={20} src={icon} alt={alt} style={{ color }} />
          </Button>
        </SidebarEdit>
      )
  }
  return (
    <Button
      className={cn('h-[30px] w-[30px] rounded-[3px] p-[5px]')}
      style={{ backgroundColor: background }}
      onClick={() => router.push(`${path}/${id}`)}
    >
      <Image width={20} height={20} src={icon} alt={alt} style={{ color }} />
    </Button>
  )
}

export default ActionButton
