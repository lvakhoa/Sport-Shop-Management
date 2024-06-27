'use client'

import { Breadcrumb, DetailsViewButton } from '@/components/shared'
import { PATH_NAME } from '@/configs'
import { Image as ImageIcon, Info, Image, Shirt } from 'lucide-react'
import { useState } from 'react'

const breadcrumbItems = [
  {
    name: 'Events',
    link: PATH_NAME.EVENT,
  },
]

const viewButtons = [
  {
    icon: <Info />,
    text: 'Information',
  },
  {
    icon: <Image />,
    text: 'Image',
  },
  {
    icon: <Shirt />,
    text: 'Products',
  },
]

interface IProductLayout {
  information: React.ReactNode
  image: React.ReactNode
  products: React.ReactNode
}

function EventLayout({ information, image, products }: IProductLayout) {
  const [selectedButton, setSelectedButton] = useState(0)

  return (
    <div className='mx-6 my-4'>
      <Breadcrumb items={breadcrumbItems} page='View' className='mb-6' textSize={22} />

      <div className='mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3'>
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
        {selectedButton === 0 && information}
        {selectedButton === 1 && image}
        {selectedButton === 2 && products}
      </div>
    </div>
  )
}

export default EventLayout
