import { ColumnDef } from '@tanstack/react-table'
import { PATH_NAME } from '@/configs'
import { Button, Checkbox, ActionButtonShow } from '@/components/shared'
import { ArrowUpDown } from 'lucide-react'
import { voucherApi } from '@/apis'
import EditVoucherForm from './edit-voucher'
import moment from 'moment'
import { ROLE_NAME } from '@/configs/enum'
import { IVoucher, IVoucherTable } from '@/interfaces/voucher'

export const voucherColumns = (accountRole: ROLE_NAME): ColumnDef<IVoucherTable>[] => [
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
    accessorKey: 'campaign_name',
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          style={{ backgroundColor: 'transparent' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Campaign Name
          <ArrowUpDown className='ml-2 size-4' />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue('campaign_name')}</div>,
  },
  {
    accessorKey: 'group_voucher_name',
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          style={{ backgroundColor: 'transparent' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Group Voucher Name
          <ArrowUpDown className='ml-2 size-4' />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue('group_voucher_name')}</div>,
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
    accessorKey: 'voucher_value',
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
    cell: ({ row }) => <div>{row.getValue('voucher_value')}</div>,
    sortingFn: (rowA, rowB) => {
      const valueA = parseFloat(rowA.getValue('voucher_value') as string)
      const valueB = parseFloat(rowB.getValue('voucher_value') as string)

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
    accessorKey: 'total_quantity',
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
    cell: ({ row }) => <div>{row.getValue('total_quantity')}</div>,
    sortingFn: (rowA, rowB) => {
      const valueA = parseFloat(rowA.getValue('total_quantity') as string)
      const valueB = parseFloat(rowB.getValue('total_quantity') as string)

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
    accessorKey: 'starting_date',
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          style={{ backgroundColor: 'transparent' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Starting Date
          <ArrowUpDown className='ml-2 size-4' />
        </Button>
      )
    },
    cell: ({ row }) => <div>{moment(row.getValue('starting_date')).format('DD-MM-YYYY')}</div>,
  },
  {
    accessorKey: 'ending_date',
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          style={{ backgroundColor: 'transparent' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Ending Date
          <ArrowUpDown className='ml-2 size-4' />
        </Button>
      )
    },
    cell: ({ row }) => <div>{moment(row.getValue('ending_date')).format('DD-MM-YYYY')}</div>,
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
      return <div className='font-medium'>Actions</div>
    },

    cell: ({ row }) => {
      const voucherId = row.getValue('id') as string
      return (
        <ActionButtonShow
          viewOnly={accountRole !== ROLE_NAME.ADMIN}
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
