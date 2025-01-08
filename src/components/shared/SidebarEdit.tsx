import { Button } from '@/components/shared/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/shared/sheet'
import { ReactElement } from 'react'

interface ISidebarEdit {
  title: string
  description: string
  children?: React.ReactNode
  content?: ReactElement
}

export default function SidebarEdit({ title, description, children, content }: ISidebarEdit) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className='max-h-screend overflow-y-auto'>{content}</div>
        <SheetFooter>
          {/* <SheetClose asChild>
            <Button
              type='submit'
              className='flex gap-[5px] bg-secondary duration-300 hover:bg-[#739AF4]'
            >
              {title.toLocaleLowerCase().includes('add') ? (
                <span className='text-[15px] font-normal text-[#FFFFFF]'>{title}</span>
              ) : (
                <span className='text-[15px] font-normal text-[#FFFFFF]'>Save changes</span>
              )}
            </Button>
          </SheetClose> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
