'use client'

import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/select'

interface IComboBox {
  defaultValue?: string
  placeholder: string
  items: string[] | { value: string; label: string }[]
  className?: string
  onValueChange?: (selectedValue: string) => void
}

export default function ComboBox({
  defaultValue,
  placeholder,
  items,
  className,
  onValueChange,
}: IComboBox) {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(defaultValue)

  const handleSelectChange = (value: string) => {
    setSelectedValue(value)
    if (onValueChange) {
      onValueChange(value)
    }
  }

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue)
    }
  }, [defaultValue])

  return (
    <div className={className}>
      <Select
        defaultValue={defaultValue}
        value={selectedValue}
        onValueChange={(e) => handleSelectChange(e)}
      >
        <SelectTrigger className='w-full'>
          <SelectValue placeholder={<span className='text-muted-foreground'>{placeholder}</span>} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) =>
              typeof item === 'string' ? (
                <SelectItem key={item} value={item}>
                  {item.replace(item[0], item[0].toUpperCase())}
                </SelectItem>
              ) : (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ),
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
