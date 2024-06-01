'use client'

import { ColumnDef } from '@tanstack/react-table'
import { FILTER_INPUT_TYPE, GENDER } from '@/configs/enum'
import { actions, PATH_NAME } from '@/configs'
import { default as ActionButton } from '@/components/shared/ActionButton'
import { TABLE_ACTION_TYPE } from '@/configs/enum'
import { Label } from '@/components/shared/label'
import { Input } from '@/components/shared/input'
import { Select } from '@/components/shared/select'
import { ComboBox } from '@/components/shared/ComboBox'
import { Button } from '@/components/shared/button'
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'
import { Checkbox } from '@/components/shared/checkbox'
import useWindowSize from '@/hooks/useWindowSize'
import { ActionButtonShow } from '@/components/shared/ActionButtonShow'

export interface ICustomer {
  id: string
  name: string
  email: string
  phone: string
  gender: GENDER
}

export interface IFilterInput {
  key: string
  title: string
  type: FILTER_INPUT_TYPE
  dropdownItems?: GENDER[]
}

export const filterInput: IFilterInput[] = [
  {
    key: 'name',
    title: 'Name',
    type: FILTER_INPUT_TYPE.TEXTBOX,
  },
  {
    key: 'email',
    title: 'Email',
    type: FILTER_INPUT_TYPE.TEXTBOX,
  },
  {
    key: 'phone',
    title: 'Phone',
    type: FILTER_INPUT_TYPE.TEXTBOX,
  },
  {
    key: 'gender',
    title: 'Gender',
    type: FILTER_INPUT_TYPE.DROPDOWN,
    dropdownItems: [GENDER.MALE, GENDER.FEMALE],
  },
]

const gender: string[] = [GENDER.FEMALE, GENDER.MALE]

export const columns: ColumnDef<ICustomer>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          style={{ backgroundColor: 'transparent' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className='ml-2 size-4' />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          style={{ backgroundColor: 'transparent' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown className='ml-2 size-4' />
        </Button>
      )
    },
    cell: ({ row }) => <div className='lowercase'>{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'phone',
    header: () => {
      return <div className='font-medium'>Phone</div>
    },
  },
  {
    accessorKey: 'gender',
    header: () => {
      return <div className='font-medium'>Gender</div>
    },
    filterFn: 'equalsString',
  },
  {
    id: 'actions',
    header: () => {
      return <div className='font-medium'>Action</div>
    },

    cell: ({ row, table }) => {
      const customerId = row.getValue('id') as string
      return <ActionButtonShow path={PATH_NAME.CUSTOMER} id={customerId} />
    },
  },
]
