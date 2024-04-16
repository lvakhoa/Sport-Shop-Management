import * as React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/select'

interface IComboBox {
  placeholder: string
  items: string[]
  className?: string
}

export function ComboBox({ placeholder, items, className }: IComboBox) {
  return (
    <div className={className}>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={<span className="text-muted-foreground">{placeholder}</span>} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item} value={item.toLowerCase()}>
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
