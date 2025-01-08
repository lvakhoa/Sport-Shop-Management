'use client'

import { ColumnDef } from '@tanstack/react-table'
import { FILTER_INPUT_TYPE, GENDER } from '@/configs/enum'
import { PATH_NAME } from '@/configs'
import { Button, Checkbox, ActionButtonShow } from '@/components/shared'
import { ArrowUpDown } from 'lucide-react'
import { IFilterInput } from '@/interfaces'
import { brandApi } from '@/apis'
import EditBrandForm from './edit-brand'
import { IBrand } from '@/interfaces/brand'

export const brandFilterInput: IFilterInput[] = [
  {
    key: 'name',
    title: 'Name',
    type: FILTER_INPUT_TYPE.TEXTBOX,
  },
  {
    key: 'is_active',
    title: 'Status',
    type: FILTER_INPUT_TYPE.DROPDOWN,
    dropdownItems: ['Active', 'Inactive'],
  },
]

export const columns: ColumnDef<IBrand>[] = [
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
    accessorKey: 'is_active',
    header: () => {
      return <div className='font-medium'>Status</div>
    },
    cell: ({ row }) => {
      return row.getValue('is_active') === true ? (
        <div className='rounded-sm bg-green-300 p-1 text-center text-green-600'>Active</div>
      ) : (
        <div className='rounded-sm bg-red-300 p-1 text-center text-red-600'>Inactive</div>
      )
    },
  },
  {
    id: 'actions',
    header: () => {
      return <div className='font-medium'>Action</div>
    },

    cell: ({ row }) => {
      const brandId = row.getValue('id') as string
      return (
        <ActionButtonShow
          path={PATH_NAME.BRAND}
          id={brandId}
          tableKey='brands'
          editContentElement={<EditBrandForm brandId={brandId} />}
          deleteMethod={() => brandApi.deleteBrandById(brandId)}
        />
      )
    },
  },
]
