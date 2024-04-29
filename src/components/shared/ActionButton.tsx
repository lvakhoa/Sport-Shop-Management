import { cn } from '@/lib/utils'
import Image from 'next/image'
import React, { ReactElement } from 'react'
import { Button } from './button'
import { useRouter } from 'next/navigation'
import { TABLE_ACTION_TYPE } from '@/configs/enum'
import { AlertPopup } from '@/components/shared/AlertPopup'
import { SidebarEdit } from './SidebarEdit'
import { Label } from './label'
import { Input } from './input'
import { PATH_NAME } from '@/configs'

interface IActionButton {
  background: string
  color?: string
  icon: string
  alt: string
  type: TABLE_ACTION_TYPE
  id: string
  path?: string
  editContentElement?: ReactElement
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
}: IActionButton) {
  const router = useRouter()
  const selectButtonAction = () => {
    switch (type) {
      case 'VIEW':
        return () => router.push(`${path}/${id}`)
      case 'EDIT':
        return () => console.log('Sidebar opened')
      case 'DELETE':
        return () => console.log('Delete popup')
      default:
        break
    }
  }

  switch (type) {
    case 'DELETE':
      return (
        <AlertPopup title="Delete?" description="Are you sure?">
          <Button
            className={cn('h-[30px] w-[30px] rounded-[3px] p-[5px]')}
            style={{ backgroundColor: background }}
            onClick={selectButtonAction()}
          >
            <Image width={20} height={20} src={icon} alt={alt} style={{ color }} />
          </Button>
        </AlertPopup>
      )
    case 'EDIT':
      return (
        <SidebarEdit
          title="Edit Profile"
          description="Make changes to profile here. Click save when you are done."
          content={editContentElement}
        >
          <Button
            className={cn('h-[30px] w-[30px] rounded-[3px] p-[5px]')}
            style={{ backgroundColor: background }}
            onClick={selectButtonAction()}
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
      onClick={selectButtonAction()}
    >
      <Image width={20} height={20} src={icon} alt={alt} style={{ color }} />
    </Button>
  )
}

export default ActionButton
