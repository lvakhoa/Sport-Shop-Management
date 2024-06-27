'use client'

import { ColumnDef } from '@tanstack/react-table'
import { FILTER_INPUT_TYPE } from '@/configs/enum'
import { Button, Checkbox } from '@/components/shared'
import { ArrowUpDown } from 'lucide-react'
import { IFilterInput } from '@/interfaces'

export interface IAddress {
  id: string
  accountId: string
  street: string
  ward: string
  district: string
  city: string
}

export const addressFilterInput: IFilterInput[] = [
  {
    key: 'street',
    title: 'Street',
    type: FILTER_INPUT_TYPE.TEXTBOX,
  },
  {
    key: 'ward',
    title: 'Ward',
    type: FILTER_INPUT_TYPE.TEXTBOX,
  },
  {
    key: 'district',
    title: 'District',
    type: FILTER_INPUT_TYPE.TEXTBOX,
  },
  {
    key: 'city',
    title: 'City',
    type: FILTER_INPUT_TYPE.TEXTBOX,
  },
]

export const columns: ColumnDef<IAddress>[] = [
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
    enableHiding: true,
  },
  {
    accessorKey: 'street',
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          style={{ backgroundColor: 'transparent' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Street
          <ArrowUpDown className='ml-2 size-4' />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue('street')}</div>,
  },
  {
    accessorKey: 'ward',
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          style={{ backgroundColor: 'transparent' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Ward
          <ArrowUpDown className='ml-2 size-4' />
        </Button>
      )
    },
    cell: ({ row }) => <div className='lowercase'>{row.getValue('ward')}</div>,
  },
  {
    accessorKey: 'district',
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          style={{ backgroundColor: 'transparent' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          District
          <ArrowUpDown className='ml-2 size-4' />
        </Button>
      )
    },
    cell: ({ row }) => <div className='lowercase'>{row.getValue('district')}</div>,
  },
  {
    accessorKey: 'city',
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          style={{ backgroundColor: 'transparent' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          City
          <ArrowUpDown className='ml-2 size-4' />
        </Button>
      )
    },
    cell: ({ row }) => <div className='lowercase'>{row.getValue('city')}</div>,
  },
]
