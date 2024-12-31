'use client'

import { ColumnDef } from '@tanstack/react-table'
import { FILTER_INPUT_TYPE, ROLE_NAME } from '@/configs/enum'
import { PATH_NAME } from '@/configs'
import { Button, Checkbox, ActionButtonShow } from '@/components/shared'
import { ArrowUpDown } from 'lucide-react'
import { IFilterInput } from '@/interfaces'
import { productApi } from '@/apis'
import EditProductForm from './edit-product'
import { IProduct } from '@/interfaces/product'

// const status: string[] = [STATUS.ACTIVE, STATUS.INACTIVE]

export const productColumns = (accountRole: ROLE_NAME): ColumnDef<IProduct>[] => [
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
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          style={{ backgroundColor: 'transparent' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Category
          <ArrowUpDown className='ml-2 size-4' />
        </Button>
      )
    },
  },
  {
    accessorKey: 'listPrice',
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
    cell: ({ row }) => <div>{row.getValue('listPrice')}</div>,
    sortingFn: (rowA, rowB) => {
      const valueA = parseFloat((rowA.getValue('listPrice') as string).slice(0, -4))
      const valueB = parseFloat((rowB.getValue('listPrice') as string).slice(0, -4))

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
    id: 'actions',
    header: () => {
      return <div className='font-medium'>Actions</div>
    },

    cell: ({ row }) => {
      const productId = row.getValue('id') as string
      return (
        <ActionButtonShow
          viewOnly={accountRole !== ROLE_NAME.ADMIN}
          path={PATH_NAME.PRODUCT}
          id={productId}
          editContentElement={<EditProductForm productId={productId} />}
          tableKey='products'
          deleteMethod={() => productApi.deleteProductById(productId)}
        />
      )
    },
  },
]
