'use client'

import * as React from 'react'
import { Check, X } from 'lucide-react'

import { Badge } from '@/components/shared/badge'
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/shared/command'
import { Command as CommandPrimitive } from 'cmdk'

type TItem = {
  /**
   * Value of the item
   */
  value: string

  /**
   * Label of the item
   */
  label: string
}

type Props = {
  /**
   * Height of the menu
   * @default 200
   */
  menuHeight?: number

  /**
   * Title to display when the user selects an item
   * @example 'Select a framework'
   */
  selectTitle?: string

  /**
   * All items that can be selected
   * @example [{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }]
   */
  allItems: TItem[]

  /**
   * Selected items
   * @example [{ value: 'react', label: 'React' }]
   */
  selectedItem: TItem[]

  /**
   * Function to change the selected items
   */
  changeSelectedItem: React.Dispatch<React.SetStateAction<TItem[]>>
}

/**
 * MultiSelect component
 *
 * **Basic usage:**
 *
 * ```tsx
 * <MultiSelect>
 *    <button>Click me</button>
 * </MultiSelect>
 * ```
 * It can contain **three props** to display and manipulate the selected items
 *
 * ```tsx
 * <MultiSelect
 *    allItems={allItems}
 *    selectedItem={selectedItem}
 *    changeSelectedItem={setSelectedItem}
 * />
 * ```
 *
 * @param props
 * @returns
 */
export default function MultiSelect({
  menuHeight = 200,
  selectTitle,
  allItems,
  selectedItem,
  changeSelectedItem,
}: Props) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('')

  const handleUnselect = React.useCallback(
    (item: TItem) => {
      changeSelectedItem((prev) => prev.filter((s) => s.value !== item.value))
    },
    [changeSelectedItem],
  )

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            changeSelectedItem((prev) => {
              const newSelected = [...prev]
              newSelected.pop()
              return newSelected
            })
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === 'Escape') {
          input.blur()
        }
      }
    },
    [changeSelectedItem],
  )

  const selectables = allItems.filter((item) => !selectedItem.includes(item))

  const handleSelectItem = (item: TItem) => {
    if (selectedItem.findIndex((selected) => selected.value === item.value) === -1) {
      changeSelectedItem((prev) => [...prev, item])
    } else {
      changeSelectedItem((prev) => prev.filter((s) => s.value !== item.value))
    }
  }

  return (
    <Command onKeyDown={handleKeyDown} className='overflow-visible bg-transparent'>
      <div className='group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'>
        <div className='flex flex-wrap gap-1'>
          {selectedItem.map((item) => {
            return (
              <Badge key={item.value} variant='secondary'>
                {item.label}
                <button
                  className='ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2'
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUnselect(item)
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => handleUnselect(item)}
                >
                  <X className='size-3 text-muted-foreground hover:text-foreground' />
                </button>
              </Badge>
            )
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={selectTitle}
            className='ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground'
          />
        </div>
      </div>
      <div className='relative mt-2'>
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className='absolute top-0 z-10 w-full rounded-md border bg-white-100 text-black-100 shadow-md outline-none animate-in'>
              <CommandGroup className='overflow-auto' style={{ height: menuHeight }}>
                {selectables.map((item) => {
                  return (
                    <CommandItem
                      key={item.value}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onSelect={() => {
                        setInputValue('')
                        handleSelectItem(item)
                      }}
                      className={'cursor-pointer'}
                    >
                      <div className='flex w-full items-center justify-between'>
                        <span>{item.label}</span>
                        {selectedItem.findIndex((selected) => selected.value === item.value) !==
                          -1 && <Check className='size-4 text-slate-700' />}
                      </div>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  )
}
