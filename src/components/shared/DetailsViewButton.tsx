import { cn } from '@/lib/utils'
import { Button } from './button'

interface DetailsViewButtonProps {
  icon: React.ReactElement
  text: string
  isSelected: boolean
  selectView: () => void
}

function DetailsViewButton({ icon, text, isSelected, selectView }: DetailsViewButtonProps) {
  return (
    <Button
      className={cn(
        ' flex h-10 items-center justify-start gap-3 rounded-lg px-4 ',
        isSelected
          ? 'bg-primary text-white-100 hover:bg-primary'
          : 'bg-white-100 text-content hover:bg-blue-50 hover:text-primary',
      )}
      onClick={selectView}
    >
      {icon}
      <span>{text}</span>
    </Button>
  )
}

export default DetailsViewButton
