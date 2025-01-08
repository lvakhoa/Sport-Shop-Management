'use client'

import { ColumnDef } from '@tanstack/react-table'
import { FILTER_INPUT_TYPE, GENDER } from '@/configs/enum'
import { PATH_NAME } from '@/configs'
import { Button, Checkbox, ActionButtonShow } from '@/components/shared'
import { ArrowUpDown } from 'lucide-react'
import { IFilterInput } from '@/interfaces'
import { customerApi } from '@/apis'
import EditCustomerForm from './edit-customer'
import { ICustomer } from '@/interfaces/customer'

export const customerFilterInput: IFilterInput[] = [
  {
    key: 'fullname',
    title: 'Name',
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

export const columns: ColumnDef<ICustomer>[] = [
  {
    accessorKey: 'fullname',
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
    cell: ({ row }) => <div>{row.getValue('fullname')}</div>,
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

    cell: ({ row }) => {
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
