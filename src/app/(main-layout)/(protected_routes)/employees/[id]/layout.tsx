'use client'

import { Breadcrumb, DetailsViewButton } from '@/components/shared'
import { PATH_NAME } from '@/configs'
import { Info, SquareUser, Package } from 'lucide-react'
import { useState } from 'react'

const breadcrumbItems = [
  {
    name: 'Employees',
    link: PATH_NAME.EMPLOYEE,
  },
]

const viewButtons = [
  {
    icon: <Info />,
    text: 'Profile',
  },
  {
    icon: <Package />,
    text: 'Orders',
  },
]

interface IEmployeeLayout {
  profile: React.ReactNode
  orders: React.ReactNode
}

function EmployeeLayout({ profile, orders }: IEmployeeLayout) {
  const [selectedButton, setSelectedButton] = useState(0)

  return (
    <div className='mx-6 my-4'>
      <Breadcrumb
        items={breadcrumbItems}
        page={viewButtons[selectedButton].text}
        className='mb-6'
        textSize={22}
      />

      <div className='mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4'>
        {viewButtons.map((item, index) => (
          <DetailsViewButton
            key={item.text}
            {...item}
            isSelected={selectedButton === index}
            selectView={() => setSelectedButton(index)}
          />
        ))}
      </div>

      <div>
        {selectedButton === 0 && profile}
        {selectedButton === 1 && orders}
      </div>
    </div>
  )
}

export default EmployeeLayout
