'use client'

import { ColumnDef } from '@tanstack/react-table'
import { FILTER_INPUT_TYPE, STATUS } from '@/configs/enum'
import { PATH_NAME } from '@/configs'
import { Button, Checkbox, ActionButtonShow } from '@/components/shared'
import { ArrowUpDown } from 'lucide-react'
import { IFilterInput } from '@/interfaces'
import { eventApi, productApi } from '@/apis'
import EditEventForm from './edit-event'
import moment from 'moment'

export interface IEvent {
  id: string
  title: string
  content: string
  start_date: string
  end_date: string
  sale_percent: string
  total: number
}

export const columns: ColumnDef<IEvent>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: 'ID',
    enableHiding: true,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          style={{ backgroundColor: 'transparent' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Title
          <ArrowUpDown className='ml-2 size-4' />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue('title')}</div>,
  },
  {
    accessorKey: 'start_date',
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          style={{ backgroundColor: 'transparent' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Start Date
          <ArrowUpDown className='ml-2 size-4' />
        </Button>
      )
    },
    cell: ({ row }) => <div>{moment(row.getValue('start_date')).format('DD-MM-YYYY')}</div>,
  },
  {
    accessorKey: 'end_date',
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          style={{ backgroundColor: 'transparent' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          End Date
          <ArrowUpDown className='ml-2 size-4' />
        </Button>
      )
    },
    cell: ({ row }) => <div>{moment(row.getValue('end_date')).format('DD-MM-YYYY')}</div>,
  },
  {
    accessorKey: 'sale_percent',
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          style={{ backgroundColor: 'transparent' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Sale Percent
          <ArrowUpDown className='ml-2 size-4' />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue('sale_percent')}</div>,
    sortingFn: (rowA, rowB) => {
      const valueA = parseFloat(rowA.getValue('sale_percent') as string)
      const valueB = parseFloat(rowB.getValue('sale_percent') as string)

      if (valueA < valueB) {
        return -1
      }
      if (valueA > valueB) {
        return 1
      }
      return 0
    },
  },
  {
    id: 'actions',
    header: () => {
      return <div className='font-medium'>Actions</div>
    },

    cell: ({ row }) => {
      const eventId = row.getValue('id') as string
      return (
        <ActionButtonShow
          path={PATH_NAME.EVENT}
          id={eventId}
          editContentElement={<EditEventForm eventId={eventId} />}
          tableKey='events'
          deleteMethod={() => eventApi.deleteEventById(eventId)}
        />
      )
    },
  },
]
