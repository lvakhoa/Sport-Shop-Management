import { ColumnDef } from '@tanstack/react-table'
import { PATH_NAME } from '@/configs'
import { Button, Checkbox, ActionButtonShow } from '@/components/shared'
import { ArrowUpDown } from 'lucide-react'
import { customerAccountApi } from '@/apis'
import { ROLE_TITLE } from '@/configs/enum'
import EditCustomerAccountForm from './edit-account'

export interface ICustomerAccount {
  id: string
  email: string
  customer: string
  total: number
}

export const customerAccountColumns = (accountRole: ROLE_TITLE): ColumnDef<ICustomerAccount>[] => [
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
    cell: ({ row }) => <div>{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'customer',
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          style={{ backgroundColor: 'transparent' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Customer
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue('customer')}</div>,
  },
  {
    id: 'actions',
    header: () => {
      return <div className='font-medium'>Actions</div>
    },

    cell: ({ row }) => {
      const accountId = row.getValue('id') as string
      return (
        <ActionButtonShow
          viewOnly={accountRole !== ROLE_TITLE.ADMIN && accountRole !== ROLE_TITLE.MANAGER}
          path={PATH_NAME.ACCOUNT.BASE + PATH_NAME.ACCOUNT.CUSTOMER}
          id={accountId}
          editContentElement={<EditCustomerAccountForm accountId={accountId} />}
          tableKey='customer-account'
          deleteMethod={() => customerAccountApi.deleteCustomerAccountById(accountId)}
        />
      )
    },
  },
]
