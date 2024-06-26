'use client'

import { ColumnDef } from '@tanstack/react-table'
import { FILTER_INPUT_TYPE, GENDER } from '@/configs/enum'
import { PATH_NAME } from '@/configs'
import { Button, Checkbox, ActionButtonShow } from '@/components/shared'
import { ArrowUpDown } from 'lucide-react'
import { IFilterInput } from '@/interfaces'
import { customerApi } from '@/apis'
import EditCustomerForm from './edit-customer'

export interface ICustomer {
  id: string
  name: string
  email: string
  phone: string
  gender: GENDER
  rank: string
  loyalty_point: number
  total: number
}

export const customerFilterInput: IFilterInput[] = [
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
    accessorKey: 'rank',
    header: () => {
      return <div className='font-medium'>Rank</div>
    },
  },
  {
    accessorKey: 'loyalty_point',
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          style={{ backgroundColor: 'transparent' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          L.Point
          <ArrowUpDown className='ml-2 size-4' />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue('loyalty_point')}</div>,
  },
  {
    id: 'actions',
    header: () => {
      return <div className='font-medium'>Action</div>
    },

    cell: ({ row, table }) => {
      const customerId = row.getValue('id') as string
      return (
        <ActionButtonShow
          path={PATH_NAME.CUSTOMER}
          id={customerId}
          tableKey='customers'
          editContentElement={<EditCustomerForm customerId={customerId} />}
          deleteMethod={() => customerApi.deleteCustomerById(customerId)}
        />
      )
    },
  },
]
