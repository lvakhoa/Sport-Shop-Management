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
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: () => {
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
    },
  },
]
