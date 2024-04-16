import { Button } from '@/components/shared/button'
import { Input } from '@/components/shared/input'
import { Label } from '@/components/shared/label'
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

export function SidebarEdit({ title, description, children, content }: ISidebarEdit) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {content}
        <SheetFooter>
          <SheetClose asChild>
            <Button
              type="submit"
              className="bg-[#648EEF] hover:bg-[#739AF4] flex gap-[5px] duration-300"
            >
              {title.toLocaleLowerCase().includes('add') ? (
                <span className="text-[15px] font-normal">{title}</span>
              ) : (
                <span className="text-[15px] font-normal">Save changes</span>
              )}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
