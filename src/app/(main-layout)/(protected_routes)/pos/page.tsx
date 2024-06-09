'use client'

import { useBrowser } from '@/hooks'
import { ProductItem, SearchBar, SelectBrand, SelectCategory } from './components'
import { useState } from 'react'
import { ProductModal } from './components/modal/product-modal'
import { Card } from '@/components/shared/card'
import { PosTab } from './components'
import { IProductItem } from './components/product/product-item'
import { cn } from '@/lib/utils'

export interface IProductItem1 {
  name: string
  price: number
  image: string
  stock: {
    media: string[]
    color: string[]
    size: string[]
  }
}

function getData(): IProductItem1[] {
  return [
    {
      name: 'Clothes 1',
      price: 1000,
      image: '/assets/images/clothes1.png',
      stock: {
        media: [
          '/assets/images/clothes1.png',
          '/assets/images/clothes1.png',
          '/assets/images/clothes1.png',
          '/assets/images/clothes1.png',
          '/assets/images/clothes1.png',
          '/assets/images/clothes1.png',
        ],
        color: ['red', 'blue', 'green'],
        size: ['S', 'M', 'L'],
      },
    },
    {
      name: 'Clothes 2',
      price: 2000,
      image: '/assets/images/clothes1.png',
      stock: {
        media: [
          '/assets/images/clothes1.png',
          '/assets/images/clothes1.png',
          '/assets/images/clothes1.png',
        ],
        color: ['red', 'blue', 'green'],
        size: ['S', 'M', 'L'],
      },
    },
    {
      name: 'Clothes 3',
      price: 3000,
      image: '/assets/images/clothes1.png',
      stock: {
        media: [
          '/assets/images/clothes1.png',
          '/assets/images/clothes1.png',
          '/assets/images/clothes1.png',
        ],
        color: ['red', 'blue', 'green'],
        size: ['S', 'M', 'L'],
      },
    },
    {
      name: 'Clothes 1',
      price: 1000,
      image: '/assets/images/clothes1.png',
      stock: {
        media: [
          '/assets/images/clothes1.png',
          '/assets/images/clothes1.png',
          '/assets/images/clothes1.png',
        ],
        color: ['red', 'blue', 'green'],
        size: ['S', 'M', 'L'],
      },
    },
    {
      name: 'Clothes 2',
      price: 2000,
      image: '/assets/images/clothes1.png',
      stock: {
        media: [
          '/assets/images/clothes1.png',
          '/assets/images/clothes1.png',
          '/assets/images/clothes1.png',
        ],
        color: ['red', 'blue', 'green'],
        size: ['S', 'M', 'L'],
      },
    },
    {
      name: 'Clothes 3',
      price: 3000,
      image: '/assets/images/clothes1.png',
      stock: {
        media: [
          '/assets/images/clothes1.png',
          '/assets/images/clothes1.png',
          '/assets/images/clothes1.png',
        ],
        color: ['red', 'blue', 'green'],
        size: ['S', 'M', 'L'],
      },
    },
  ]
}
export default function PosPage() {
  const { isBrowser } = useBrowser()
  const [productModalOpen, setProductModalOpen] = useState(false)
  const toggleProductModal = () => setProductModalOpen(!productModalOpen)
  const [currentProduct, setCurrentProduct] = useState<IProductItem1 | null>(null)

  const [itemsInOrder, setitemsInOrder] = useState([] as IProductItem[])

  function productClick(product: IProductItem1) {
    setCurrentProduct(product)
    toggleProductModal()
  }

  const addToReceipt = (color: string, size: string, quantity: number) => {
    if (currentProduct) {
      setitemsInOrder([
        ...itemsInOrder,
        {
          name: currentProduct.name,
          price: currentProduct.price,
          image: currentProduct.image,
          color,
          size,
          quantity,
        },
      ])
    }
    toggleProductModal()
  }

  const handleRemove = (index: number) => {
    const newItems = [...itemsInOrder]
    newItems.splice(index, 1)
    setitemsInOrder(newItems)
  }

  const cancelOrder = () => {
    setitemsInOrder([])
  }
  return (
    <div className='flex w-full'>
      <div className='pl-[20px] pr-[20px] md:w-[calc(100%-340px)] lg:w-[calc(100%-360px)] xl:w-[calc(100%-400px)]'>
        <div className='grid grid-cols-3 gap-4 pb-[20px] '>
          <SearchBar />
          <SelectCategory />
          <SelectBrand />
        </div>
        {!!isBrowser && (
          <div className='grid grid-cols-3 gap-10'>
            {getData().map((product) => (
              <ProductItem key={product.name} {...product} onClick={() => productClick(product)} />
            ))}
          </div>
        )}
        {currentProduct && (
          <ProductModal
            isOpen={productModalOpen}
            onClose={toggleProductModal}
            product={currentProduct}
            onAddToReceipt={addToReceipt}
          />
        )}
      </div>
      <div
        className={cn(
          'scrollbar',
          'fixed right-0 top-[--header-height] mr-[20px] mt-[10px] h-[calc(100vh-var(--header-height))] overflow-hidden rounded-md bg-white-100 shadow-md hover:overflow-y-auto md:w-[320px] lg:w-[340px] xl:w-[380px]',
        )}
      >
        <PosTab
          productList={itemsInOrder}
          handleRemove={handleRemove}
          cancelOrder={cancelOrder}
        ></PosTab>
      </div>
    </div>
  )
}
