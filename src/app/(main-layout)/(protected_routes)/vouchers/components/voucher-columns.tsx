'use client'

import { ColumnDef } from '@tanstack/react-table'
import { FILTER_INPUT_TYPE, STATUS } from '@/configs/enum'
import { PATH_NAME } from '@/configs'
import { Button, Checkbox, ActionButtonShow } from '@/components/shared'
import { ArrowUpDown, Edit } from 'lucide-react'
import { IFilterInput } from '@/interfaces'
import { voucherApi } from '@/apis'
import EditVoucherForm from './edit-voucher'
import moment from 'moment'

export interface IVoucher {
  id: string
  title: string
  sale_percent: string
  quantity: string
  expired_date: string
  total: number
}

export const columns: ColumnDef<IVoucher>[] = [
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
    accessorKey: 'code',
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          style={{ backgroundColor: 'transparent' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Code
          <ArrowUpDown className='ml-2 size-4' />
        </Button>
      )
    },
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
    sortingFn: (rowA, rowB) => {
      const valueA = parseFloat(rowA.getValue('quantity') as string)
      const valueB = parseFloat(rowB.getValue('quantity') as string)

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
    accessorKey: 'expired_date',
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          style={{ backgroundColor: 'transparent' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Expired Date
          <ArrowUpDown className='ml-2 size-4' />
        </Button>
      )
    },
    cell: ({ row }) => <div>{moment(row.getValue('expired_date')).format('DD-MM-YYYY')}</div>,
  },
  {
    id: 'actions',
    header: () => {
      return <div className='font-medium'>Actions</div>
    },

    cell: ({ row }) => {
      const voucherId = row.getValue('id') as string
      return (
        <ActionButtonShow
          path={PATH_NAME.VOUCHER}
          id={voucherId}
          editContentElement={<EditVoucherForm voucherId={voucherId} />}
          tableKey='vouchers'
          deleteMethod={() => voucherApi.deleteVoucherById(voucherId)}
        />
      )
    },
  },
]
