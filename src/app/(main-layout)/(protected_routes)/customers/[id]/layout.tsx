'use client'

import { Breadcrumb, DetailsViewButton } from '@/components/shared'
import { PATH_NAME } from '@/configs'
import { Info, SquareUser, MapPin, Package } from 'lucide-react'
import { useState } from 'react'

const breadcrumbItems = [
  {
    name: 'Customers',
    link: PATH_NAME.CUSTOMER,
  },
]

const viewButtons = [
  {
    icon: <Info />,
    text: 'Profile',
  },
  {
    icon: <SquareUser />,
    text: 'Account',
  },
  {
    icon: <MapPin />,
    text: 'Address',
  },
  {
    icon: <Package />,
    text: 'Orders',
  },
]

interface ICustomerLayout {
  profile: React.ReactNode
  account: React.ReactNode
  address: React.ReactNode
  orders: React.ReactNode
}

function CustomerLayout({ profile, account, address, orders }: ICustomerLayout) {
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
        {selectedButton === 1 && account}
        {selectedButton === 2 && address}
        {selectedButton === 3 && orders}
      </div>
    </div>
  )
}

export default CustomerLayout
