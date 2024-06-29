'use client'

import { Button } from './button'
import { Calendar } from './calendar'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { cn } from '@/lib/utils'
import moment from 'moment'
import { CalendarIcon } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

export default function DatePicker({
  date,
  selectDate,
}: {
  date: Date | undefined
  selectDate: (date: Date | undefined) => void
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className='mr-2 size-4' />
          {date ? moment(date).format('DD/MM/YYYY') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align='start' className=' w-auto p-0'>
        <Calendar
          mode='single'
          captionLayout='dropdown-buttons'
          selected={moment(date).toDate()}
          onSelect={(e) => selectDate(e)}
          fromYear={1960}
          toYear={2030}
        />
      </PopoverContent>
    </Popover>
  )
}
