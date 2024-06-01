'use client'

import { STATUS } from '@/configs/enum'
import { columns, IProduct } from './components'
import { DataTable } from '@/components/shared/data-table'
import { Label } from '@/components/shared/label'
import { Input } from '@/components/shared/input'
import { ComboBox } from '@/components/shared/ComboBox'
import { useBrowser } from '@/hooks'

function getData(): IProduct[] {
  // Fetch data from your API here.
  return [
    {
      id: '1',
      name: 'Sechtoy',
      category: 'Toy',
      buyingPrice: '69.000 VND',
      sellingPrice: '99.000 VND',
      status: STATUS.ACTIVE,
    },
    {
      id: '2',
      name: 'Aodu',
      category: 'Underwears',
      buyingPrice: '169.000 VND',
      sellingPrice: '199.000 VND',
      status: STATUS.ACTIVE,
    },
    {
      id: '3',
      name: 'Quanxi',
      category: 'Underwears',
      buyingPrice: '269.000 VND',
      sellingPrice: '299.000 VND',
      status: STATUS.ACTIVE,
    },
  ]
}

const status: string[] = [STATUS.ACTIVE, STATUS.INACTIVE]

const addContentSidebarElement = (
  <div className="grid gap-4 py-4">
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="name" className="text-right">
        Name
      </Label>
      <Input id="name" value="Pedro Duarte" className="col-span-3" />
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="category" className="text-right">
        Category
      </Label>
      <Input id="category" value="Kobiet" className="col-span-3" />
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="buyingPrice" className="text-right">
        B.Price
      </Label>
      <Input id="buyingPrice" value="100.000" className="col-span-3" />
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="sellingPrice" className="text-right">
        S.Price
      </Label>
      <Input id="sellingPrice" value="200.000" className="col-span-3" />
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="status" className="text-right"></Label>
      <div className="col-span-3">
        <ComboBox key="status" placeholder="Status" items={status} />
      </div>
    </div>
  </div>
)

export default function EmployeesManagementPage() {
  const data = getData()
  const { isBrowser } = useBrowser()

  return (
    <div className="container mx-auto py-10">
      {!!isBrowser && (
        <DataTable
          columns={columns}
          data={data}
          title="Products"
          addContentSidebar={addContentSidebarElement}
        />
      )}
    </div>
  )
}
