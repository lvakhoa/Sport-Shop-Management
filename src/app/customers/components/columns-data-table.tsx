'use client'

import { ColumnDef } from '@tanstack/react-table'
import { FILTER_INPUT_TYPE, GENDER } from '@/configs/enum'
import { actions } from '@/configs'
import { ActionButton } from '@/components/shared'
import { TABLE_ACTION_TYPE } from '@/configs/enum'
import { Label } from '@/components/shared/label'
import { Input } from '@/components/shared/input'
import { Select } from '@/components/shared/select'
import { ComboBox } from '@/components/shared/ComboBox'
import { Button } from '@/components/shared/button'
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'
import { Checkbox } from '@/components/shared/checkbox'
import useWindowSize from '@/hooks/windowSize'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shared/popover'

export interface ICustomer {
  name: string
  email: string
  phone: string
  gender: GENDER
  // action: React.JSX.Element[]
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

const addContentElement = (
  <div className="grid gap-4 py-4">
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="name" className="text-right">
        Name
      </Label>
      <Input id="name" value="Pedro Duarte" className="col-span-3" />
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="email" className="text-right">
        Email
      </Label>
      <Input id="email" value="@peduarte" className="col-span-3" />
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="phone" className="text-right">
        Phone
      </Label>
      <Input id="phone" value="@peduarte" className="col-span-3" />
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="gender" className="text-right">
        Gender
      </Label>
      <div className="col-span-3">
        <ComboBox key="gender" placeholder="Gender" items={gender} />
      </div>
    </div>
  </div>
)

const editContentElement = (
  <div className="grid gap-4 py-4">
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="name" className="text-right">
        Name
      </Label>
      <Input id="name" value="Pedro Duarte" className="col-span-3" />
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="email" className="text-right">
        Email
      </Label>
      <Input id="email" value="@peduarte" className="col-span-3" />
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="phone" className="text-right">
        Phone
      </Label>
      <Input id="phone" value="@peduarte" className="col-span-3" />
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="gender" className="text-right">
        Gender
      </Label>
      <div className="col-span-3">
        <ComboBox key="gender" placeholder="Gender" items={gender} />
      </div>
    </div>
  </div>
)

export const columns: ColumnDef<ICustomer>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
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
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
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
          variant="ghost"
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
    header: 'Phone',
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
    filterFn: 'equalsString',
  },
  {
    id: 'actions',
    header: 'Action',
    cell: () => {
      const { width } = useWindowSize()
      if (width > 768)
        return (
          <div className="flex gap-[15px]">
            {actions.map((action) => (
              <ActionButton
                key={action.icon}
                background={action.background}
                icon={action.icon}
                alt={action.alt}
                type={action.type}
                id="1"
                editContentElement={editContentElement}
              />
            ))}
          </div>
        )
      else
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Edit</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="flex gap-[15px]">
                {actions.map((action) => (
                  <ActionButton
                    key={action.icon}
                    background={action.background}
                    icon={action.icon}
                    alt={action.alt}
                    type={action.type}
                    id="1"
                    editContentElement={editContentElement}
                  />
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )
    },
  },
]
