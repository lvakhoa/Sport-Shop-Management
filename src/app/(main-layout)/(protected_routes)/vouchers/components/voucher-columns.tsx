import { ColumnDef } from '@tanstack/react-table'
import { PATH_NAME } from '@/configs'
import { Button, Checkbox, ActionButtonShow } from '@/components/shared'
import { ArrowUpDown } from 'lucide-react'
import { voucherApi } from '@/apis'
import EditVoucherForm from './edit-voucher'
import moment from 'moment'
import { ROLE_NAME, VOUCHER_APPLICABLE_TYPE, VOUCHER_TYPE } from '@/configs/enum'

export interface IVoucherCol {
  id: string
  campaign_name: string
  description?: string
  voucher_type: VOUCHER_TYPE
  voucher_value: number
  code: string
  starting_date: Date
  ending_date: Date
  total_quantity: number
  quantity_per_user: number
  minimum_price: number
  applicable_type: VOUCHER_APPLICABLE_TYPE
  total: number
}

export const voucherColumns = (accountRole: ROLE_NAME): ColumnDef<IVoucherCol>[] => [
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
    accessorKey: 'campaign_name',
    header: ({ column }) => (
      <Button
        className='pl-0'
        variant='ghost'
        style={{ backgroundColor: 'transparent' }}
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Campaign Name
        <ArrowUpDown className='ml-2 size-4' />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('campaign_name')}</div>,
  },
  {
    accessorKey: 'code',
    header: ({ column }) => (
      <Button
        className='pl-0'
        variant='ghost'
        style={{ backgroundColor: 'transparent' }}
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Code
        <ArrowUpDown className='ml-2 size-4' />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('code')}</div>,
  },
  {
    accessorKey: 'voucher_type',
    header: 'Voucher Type',
    cell: ({ row }) => <div>{row.getValue('voucher_type')}</div>,
  },
  {
    accessorKey: 'voucher_value',
    header: 'Voucher Value',
    cell: ({ row }) => <div>{row.getValue('voucher_value')}</div>,
  },
  {
    accessorKey: 'starting_date',
    header: 'Starting Date',
    cell: ({ row }) => <div>{moment(row.getValue('starting_date')).format('DD-MM-YYYY')}</div>,
  },
  {
    accessorKey: 'ending_date',
    header: 'Ending Date',
    cell: ({ row }) => <div>{moment(row.getValue('ending_date')).format('DD-MM-YYYY')}</div>,
  },
  {
    accessorKey: 'total_quantity',
    header: 'Total Quantity',
    cell: ({ row }) => <div>{row.getValue('total_quantity')}</div>,
  },
  {
    accessorKey: 'quantity_per_user',
    header: 'Quantity Per User',
    cell: ({ row }) => <div>{row.getValue('quantity_per_user')}</div>,
  },
  {
    accessorKey: 'minimum_price',
    header: 'Minimum Price',
    cell: ({ row }) => <div>{row.getValue('minimum_price')}</div>,
  },
  {
    accessorKey: 'applicable_type',
    header: 'Applicable Type',
    cell: ({ row }) => <div>{row.getValue('applicable_type')}</div>,
  },
  {
    id: 'actions',
    header: () => <div className='font-medium'>Actions</div>,
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
