import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/shared/alert-dialog'
import { MouseEvent, SyntheticEvent } from 'react'

interface IAlertPopup {
  title: string
  description: string
  children?: React.ReactNode
  action: () => void
  hidden?: boolean
}

export default function AlertPopup({
  title,
  description,
  children,
  action,
  hidden = false,
}: IAlertPopup) {
  const actionHandler = (e: SyntheticEvent) => {
    e.stopPropagation()
    action()
  }

  return (
    <>
      {!hidden && (
        <AlertDialog>
          <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{title}</AlertDialogTitle>
              <AlertDialogDescription>{description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={(event) => event.stopPropagation()}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={actionHandler}
                className='flex gap-[5px] bg-secondary duration-300 hover:bg-[#739AF4]'
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}
