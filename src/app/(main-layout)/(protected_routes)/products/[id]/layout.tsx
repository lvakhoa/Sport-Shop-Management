'use client'

import { Breadcrumb, DetailsViewButton } from '@/components/shared'
import { PATH_NAME } from '@/configs'
import { Image as ImageIcon, Info, LayoutGrid, PackageOpen } from 'lucide-react'
import { useState } from 'react'

const breadcrumbItems = [
  {
    name: 'Products',
    link: PATH_NAME.PRODUCT,
  },
]

const viewButtons = [
  {
    icon: <Info />,
    text: 'Information',
  },
  {
    icon: <LayoutGrid />,
    text: 'Categories',
  },
  {
    icon: <PackageOpen />,
    text: 'Stocks',
  },
]

interface IProductLayout {
  information: React.ReactNode
  categories: React.ReactNode
  stocks: React.ReactNode
}

function ProductLayout({ information, categories, stocks }: IProductLayout) {
  const [selectedButton, setSelectedButton] = useState(0)

  return (
    <div className='mx-6 my-4'>
      <Breadcrumb
        items={breadcrumbItems}
        page={viewButtons[selectedButton].text}
        className='mb-6'
        textSize={22}
      />

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
        {selectedButton === 1 && categories}
        {selectedButton === 2 && stocks}
      </div>
    </div>
  )
}

export default ProductLayout
