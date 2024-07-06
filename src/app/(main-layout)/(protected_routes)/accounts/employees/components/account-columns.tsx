import { ColumnDef } from '@tanstack/react-table'
import { PATH_NAME } from '@/configs'
import { Button, Checkbox, ActionButtonShow } from '@/components/shared'
import { ArrowUpDown } from 'lucide-react'
import { employeeAccountApi } from '@/apis'
import { ROLE_TITLE } from '@/configs/enum'
import EditEmployeeAccountForm from './edit-account'

export interface IEmployeeAccount {
  id: string
  email: string
  employee: string
  role: string
  total: number
}

export const employeeAccountColumns = (accountRole: ROLE_TITLE): ColumnDef<IEmployeeAccount>[] => [
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
    accessorKey: 'employee',
    header: ({ column }) => {
      return (
        <Button
          className='pl-0'
          variant='ghost'
          style={{ backgroundColor: 'transparent' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Employee
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue('employee')}</div>,
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
          path={PATH_NAME.ACCOUNT.BASE + PATH_NAME.ACCOUNT.EMPLOYEE}
          id={accountId}
          editContentElement={<EditEmployeeAccountForm accountId={accountId} />}
          tableKey='employee-account'
          deleteMethod={() => employeeAccountApi.deleteEmployeeAccountById(accountId)}
        />
      )
    },
  },
]
