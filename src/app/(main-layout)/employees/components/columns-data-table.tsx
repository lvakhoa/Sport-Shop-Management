'use client'

import { ColumnDef } from '@tanstack/react-table'
import { FILTER_INPUT_TYPE, GENDER } from '@/configs/enum'
import { PATH_NAME } from '@/configs'
import { Button } from '@/components/shared/button'
import { ArrowUpDown } from 'lucide-react'
import { Checkbox } from '@/components/shared/checkbox'
import { ActionButtonShow } from '@/components/shared/ActionButtonShow'

export interface IEmployee {
  id: string
  name: string
  email: string
  phone: string
  gender: GENDER
}

export interface IFilterInput {
  key: string
  title: string
  type: FILTER_INPUT_TYPE
  dropdownItems?: GENDER[]
}

export const filterInput: IFilterInput[] = [
  {
    key: 'name',
    title: 'Name',
    type: FILTER_INPUT_TYPE.TEXTBOX,
  },
  {
    key: 'email',
    title: 'Email',
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

const gender: string[] = [GENDER.FEMALE, GENDER.MALE]

export const columns: ColumnDef<IEmployee>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    enableHiding: true,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: 'transparent' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          style={{ backgroundColor: 'transparent' }}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'phone',
    header: () => {
      return <div className="font-medium">Phone</div>
    },
  },
  {
    accessorKey: 'gender',
    header: () => {
      return <div className="font-medium">Gender</div>
    },
    filterFn: 'equalsString',
  },
  {
    id: 'actions',
    header: () => {
      return <div className="font-medium">Action</div>
    },

    cell: ({ row, table }) => {
      const employeeId = row.getValue('id') as string
      return <ActionButtonShow path={PATH_NAME.EMPLOYEE} id={employeeId} />
    },
  },
]
