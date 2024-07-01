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
import { UseMutateFunction } from '@tanstack/react-query'

interface IRestorePopup {
  title: string
  description: string
  children?: React.ReactNode
  option1: UseMutateFunction<string | undefined, Error, void, unknown>
  option2: UseMutateFunction<string | undefined, Error, void, unknown>
  option3: UseMutateFunction<string | undefined, Error, void, unknown>
}

export default function RestorePopup({
  title,
  description,
  children,
  option1,
  option2,
  option3,
}: IRestorePopup) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => option1()}
            className='flex gap-[5px] bg-secondary duration-300 hover:bg-[#739AF4]'
          >
            7 days
          </AlertDialogAction>
          <AlertDialogAction
            onClick={() => option2()}
            className='flex gap-[5px] bg-secondary duration-300 hover:bg-[#739AF4]'
          >
            30 days
          </AlertDialogAction>
          <AlertDialogAction
            onClick={() => option3()}
            className='flex gap-[5px] bg-secondary duration-300 hover:bg-[#739AF4]'
          >
            All
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
