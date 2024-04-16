import { GENDER } from '@/configs/enum'
import { columns, ICustomer } from './components'
import { DataTable } from '@/components/shared/data-table'
import { ActionButton } from '@/components/shared'
import { actions } from '@/configs'
import { Label } from '@/components/shared/label'
import { Input } from '@/components/shared/input'
import { ComboBox } from '@/components/shared/ComboBox'

async function getData(): Promise<ICustomer[]> {
  // Fetch data from your API here.
  return [
    {
      name: 'Kien',
      email: 'kien@gmail.com',
      phone: '087696969',
      gender: GENDER.MALE,
    },
    // ...
  ]
}

const gender: string[] = [GENDER.FEMALE, GENDER.MALE]

const addContentSidebarElement = (
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

export default async function CustomersManagementPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={data}
        title="Customers"
        addContentSidebar={addContentSidebarElement}
      />
    </div>
  )
}
