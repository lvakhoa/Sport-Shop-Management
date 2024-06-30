import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shared/dropdown-menu'
import { ReactElement } from 'react'

interface IDropdownButton {
  trigger: ReactElement
  items: string[]
  className?: string
  onSelect?: (item: string) => void
}

function Dropdown({ trigger, items, className, onSelect }: IDropdownButton) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={className}>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {items.map((item, index) => (
          <DropdownMenuItem key={item} onClick={() => onSelect?.(item)}>
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Dropdown
