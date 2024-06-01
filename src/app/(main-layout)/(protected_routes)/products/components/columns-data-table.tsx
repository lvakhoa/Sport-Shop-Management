'use client'

import { ColumnDef } from '@tanstack/react-table'
import { FILTER_INPUT_TYPE, STATUS } from '@/configs/enum'
import { PATH_NAME } from '@/configs'
import { Button } from '@/components/shared/button'
import { ArrowUpDown } from 'lucide-react'
import { Checkbox } from '@/components/shared/checkbox'
import { ActionButtonShow } from '@/components/shared/ActionButtonShow'

export interface IProduct {
  id: string
  name: string
  category: string
  buyingPrice: string
  sellingPrice: string
  status: STATUS
}

export interface IProductFilterInput {
  key: string
  title: string
  type: FILTER_INPUT_TYPE
  dropdownItems?: STATUS[]
}

export const productFilterInput: IProductFilterInput[] = [
  {
    key: 'name',
    title: 'Name',
    type: FILTER_INPUT_TYPE.TEXTBOX,
  },
  {
    key: 'category',
    title: 'Category',
    type: FILTER_INPUT_TYPE.TEXTBOX,
  },
  {
    key: 'buyingPrice',
    title: 'Buying Price',
    type: FILTER_INPUT_TYPE.TEXTBOX,
  },
  {
    key: 'sellingPrice',
    title: 'Selling Price',
    type: FILTER_INPUT_TYPE.TEXTBOX,
  },
  {
    key: 'status',
    title: 'Status',
    type: FILTER_INPUT_TYPE.DROPDOWN,
    dropdownItems: [STATUS.ACTIVE, STATUS.INACTIVE],
  },
]

const status: string[] = [STATUS.ACTIVE, STATUS.INACTIVE]

export const columns: ColumnDef<IProduct>[] = [
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
    accessorKey: 'category',
    header: () => {
      return <div className='font-medium'>Category</div>
    },
  },
  {
    accessorKey: 'buyingPrice',
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          style={{ backgroundColor: 'transparent' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Buying Price
          <ArrowUpDown className='ml-2 size-4' />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue('buyingPrice')}</div>,
    sortingFn: (rowA, rowB) => {
      const valueA = parseFloat((rowA.getValue('buyingPrice') as string).slice(0, -4))
      const valueB = parseFloat((rowB.getValue('buyingPrice') as string).slice(0, -4))

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
    accessorKey: 'sellingPrice',
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          style={{ backgroundColor: 'transparent' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Selling Price
          <ArrowUpDown className='ml-2 size-4' />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue('sellingPrice')}</div>,
    sortingFn: (rowA, rowB) => {
      const valueA = parseFloat((rowA.getValue('sellingPrice') as string).slice(0, -4))
      const valueB = parseFloat((rowB.getValue('sellingPrice') as string).slice(0, -4))

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
    accessorKey: 'status',
    header: () => {
      return <div className='font-medium'>Status</div>
    },
  },
  {
    id: 'actions',
    header: () => {
      return <div className='font-medium'>Actions</div>
    },

    cell: ({ row }) => {
      const productId = row.getValue('id') as string
      return <ActionButtonShow path={PATH_NAME.PRODUCT} id={productId} />
    },
  },
]
