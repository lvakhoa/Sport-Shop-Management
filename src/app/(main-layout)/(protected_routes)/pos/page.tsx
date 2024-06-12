'use client'

import { useBrowser, useDebounce } from '@/hooks'
import { ProductItem, SearchBar, SelectCategory } from './components'
import { use, useState, useEffect } from 'react'
import { ProductModal } from './components/modal/product-modal'
import { Card } from '@/components/shared/card'
import { PosTab } from './components'
import { IProductItem } from './components/product/product-item'
import { cn } from '@/lib/utils'
import { SIZE } from '@/configs/enum'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { categoryApi, productApi } from '@/apis'
import { PaginationState } from '@tanstack/react-table'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/shared/pagination'

export interface IProductItem1 {
  name: string
  price: number
  image: string
  stocks: {
    media?: {
      url: string
    }
    color?: {
      name: string
    }
    size?: SIZE
    quantity_in_stock: number
  }[]
  category_list: {
    category: {
      id: string
      name: string
    }
  }[]
}

export default function PosPage() {
  const { isBrowser } = useBrowser()
  const [productModalOpen, setProductModalOpen] = useState(false)
  const toggleProductModal = () => setProductModalOpen(!productModalOpen)
  const [currentProduct, setCurrentProduct] = useState<IProductItem1 | null>(null)
  const [currentCategoryId, setCurrentCategoryId] = useState<string | undefined>(undefined)
  const [currentSearchTerm, setCurrentSearchTerm] = useState<string | undefined>(undefined)
  const [itemsInOrder, setitemsInOrder] = useState([] as IProductItem[])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 9,
  })

  const debouncedSearchTerm = useDebounce(currentSearchTerm, 300)

  const { isPending, data: queryData } = useQuery({
    queryKey: queryKeys.products.gen(pagination.pageIndex, currentCategoryId, debouncedSearchTerm),
    queryFn: () =>
      currentSearchTerm
        ? productApi.searchProduct(
            debouncedSearchTerm,
            pagination.pageSize,
            pagination.pageIndex + 1,
          )
        : productApi.getAllProduct(
            pagination.pageSize,
            pagination.pageIndex + 1,
            currentCategoryId,
          ),
    placeholderData: (previousData) => previousData,
  })
  console.log('currentCategoryId: ', currentSearchTerm)

  const data: IProductItem1[] =
    queryData
      ?.filter((item) => item.stocks.length > 0)
      ?.map((item) => {
        return {
          name: item.name,
          price: parseInt(item.selling_price),
          image: item.stocks[0]?.media?.url!,
          stocks: item.stocks,
          category_list: item.category_list,
        }
      }) || []

  function productClick(product: IProductItem1) {
    setCurrentProduct(product)
    toggleProductModal()
  }

  const onCategorySelect = (category_id: string) => {
    setCurrentCategoryId(category_id)
  }

  const onSearch = (searchTerm: string) => {
    setCurrentSearchTerm(searchTerm)
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
      <div className='px-[20px] md:w-[calc(100%-340px)] lg:w-[calc(100%-360px)] xl:w-[calc(100%-400px)]'>
        <div className='grid grid-cols-2 gap-4 pb-[20px] '>
          <SearchBar onValueChange={onSearch} />
          <SelectCategory onValueChange={onCategorySelect} />
        </div>
        {!!isBrowser && (
          <div className='grid grid-cols-3 gap-10'>
            {data.map((product) => (
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
        {/* {isBrowser && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href='#' />
              </PaginationItem>
              {
              }
              <PaginationItem>
                <PaginationNext href='#' />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )} */}
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
