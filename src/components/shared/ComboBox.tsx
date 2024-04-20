'use client'

import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/select'

interface IComboBox {
  placeholder: string
  items: string[]
  className?: string
  onValueChange?: (selectedValue: string | undefined) => void
}

export function ComboBox({ placeholder, items, className, onValueChange }: IComboBox) {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined)

  const handleSelectChange = (value: string) => {
    setSelectedValue(value)
    if (onValueChange) {
      onValueChange(value)
    }
  }

  return (
    <div className={className}>
      <Select value={selectedValue} onValueChange={(e) => handleSelectChange(e)}>
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
