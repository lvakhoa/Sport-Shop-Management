'use client'

import { ColumnDef } from '@tanstack/react-table'
import { FILTER_INPUT_TYPE, GENDER } from '@/configs/enum'
import { PATH_NAME } from '@/configs'
import { Button, ActionButtonShow, Checkbox } from '@/components/shared'
import { ArrowUpDown } from 'lucide-react'
import { IFilterInput } from '@/interfaces'
import { employeeApi } from '@/apis'
import EditEmployeeForm from './edit-employee'

export interface IEmployee {
  id: string
  fullname: string
  phone?: string
  gender?: GENDER
  avatar_url?: string
  total: number
}

export const employeeFilterInput: IFilterInput[] = [
  {
    key: 'name',
    title: 'Name',
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

export const columns: ColumnDef<IEmployee>[] = [
  {
    accessorKey: 'fullname',
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
    accessorKey: 'phone',
    header: () => {
      return <div className='font-medium'>Phone</div>
    },
  },
  {
    accessorKey: 'gender',
    header: () => {
      return <div className='font-medium'>Gender</div>
    },
    filterFn: 'equalsString',
  },
  {
    id: 'actions',
    header: () => {
      return <div className='font-medium'>Action</div>
    },

    cell: ({ row, table }) => {
      const employeeId = row.getValue('id') as string
      return (
        <ActionButtonShow
          path={PATH_NAME.EMPLOYEE}
          id={employeeId}
          tableKey='employees'
          editContentElement={<EditEmployeeForm employeeId={employeeId} />}
          deleteMethod={() => employeeApi.deleteEmployeeById(employeeId)}
        />
      )
    },
  },
]
