'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ROLE_NAME, SIZE } from '@/configs/enum'
import { PATH_NAME } from '@/configs'
import { Button, Checkbox, ActionButtonShow } from '@/components/shared'
import { ArrowUpDown } from 'lucide-react'
import { stockApi } from '@/apis'
import EditStockForm from './edit-stock'
import { IStock } from '@/interfaces/stock'
import { IProduct } from '@/interfaces/product'

export interface IStockCol {
  id: string
  name: string
  color: string
  size?: SIZE
  quantity: number
  productName: string
  total: number
}

export const stockColumns = (accountRole: ROLE_NAME): ColumnDef<IStockCol>[] => [
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
    accessorKey: 'productName',
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          style={{ backgroundColor: 'transparent' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Product Name
          <ArrowUpDown className='ml-2 size-4' />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue('productName')}</div>,
  },
  {
    accessorKey: 'size',
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          style={{ backgroundColor: 'transparent' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Size
          <ArrowUpDown className='ml-2 size-4' />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue('size')}</div>,
  },
  {
    accessorKey: 'color',
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          style={{ backgroundColor: 'transparent' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Color
          <ArrowUpDown className='ml-2 size-4' />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div>{(row.getValue('color') as string).replace(/\b\w/g, (s) => s.toUpperCase())}</div>
    ),
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          style={{ backgroundColor: 'transparent' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Quantity
          <ArrowUpDown className='ml-2 size-4' />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue('quantity')}</div>,
  },
  {
    id: 'actions',
    header: () => {
      return <div className='font-medium'>Actions</div>
    },

    cell: ({ row }) => {
      const stockId = row.getValue('id') as string
      return (
        <ActionButtonShow
          viewOnly={accountRole !== ROLE_NAME.ADMIN}
          path={PATH_NAME.STOCK}
          id={stockId}
          editContentElement={<EditStockForm stockId={stockId} />}
          tableKey='stocks'
          deleteMethod={() => stockApi.deleteStockById(stockId)}
        />
      )
    },
  },
]
