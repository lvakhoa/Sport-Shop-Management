'use client'

import { useBrowser, useDebounce } from '@/hooks'
import { useOrderStore } from '@/stores'
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
import { categoryApi, productApi, stockApi } from '@/apis'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/shared/pagination'
import { toast } from 'react-toastify'
import { ICategory } from '@/interfaces/category'

export interface IProductItem1 {
  id: string
  name: string
  price: number
  image?: string
  stocks: {
    media?: {
      url: string
    }
    color?: string
    size?: SIZE
  }[]
  category_list: ICategory[]
}

interface IPaginationState {
  pageIndex: number
  pageSize: number
}

export default function PosPage() {
  const productList = useOrderStore((state) => state.orderDetail)
  const removeAll = useOrderStore((state) => state.removeAll)
  const removeProduct = useOrderStore((state) => state.removeProduct)
  const addProduct = useOrderStore((state) => state.addProduct)

  const { isBrowser } = useBrowser()
  const [productModalOpen, setProductModalOpen] = useState(false)
  const toggleProductModal = () => setProductModalOpen(!productModalOpen)
  const [currentProduct, setCurrentProduct] = useState<IProductItem1 | null>(null)
  const [currentCategoryId, setCurrentCategoryId] = useState<string | undefined>(undefined)
  const [currentSearchTerm, setCurrentSearchTerm] = useState<string | undefined>(undefined)
  const [pagination, setPagination] = useState<IPaginationState>({
    pageIndex: 0,
    pageSize: 3,
  })

  const { data: stocksData } = useQuery({
    queryKey: queryKeys.stocks.gen(),
    queryFn: () => stockApi.getAllStock(),
  })
  const debouncedSearchTerm = useDebounce(currentSearchTerm, 300)

  const { isPending, data: queryData } = useQuery({
    queryKey: queryKeys.products.gen(undefined, currentCategoryId, debouncedSearchTerm),
    queryFn: () =>
      currentSearchTerm
        ? productApi.searchProduct(debouncedSearchTerm, undefined, undefined)
        : productApi.getAllProduct(undefined, undefined, currentCategoryId),
    placeholderData: (previousData) => previousData,
  })

  const handleNextPage = (max: number) => {
    setPagination((prev) => {
      if (prev.pageIndex === max - 1) return prev
      return { ...prev, pageIndex: prev.pageIndex + 1 }
    })
  }

  const handlePreviousPage = () => {
    setPagination((prev) => {
      if (prev.pageIndex === 0) return prev
      return { ...prev, pageIndex: prev.pageIndex - 1 }
    })
  }

  const data: IProductItem1[] =
    queryData
      ?.filter((item) => item.stocks.length > 0)
      ?.map((item) => {
        return {
          id: item.id,
          name: item.name,
          price: item.selling_price,
          image: '',
          stocks: item.stocks,
          category_list: item.categories,
        }
      }) || []

  const totalPages = Math.ceil(data.length / pagination.pageSize)
  console.log(totalPages)

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
      const index = productList?.findIndex(
        (item) => item.size === size && item.color === color && item.name === currentProduct.name,
      )
      if (index === -1 || index === undefined) {
        addProduct({
          stock_id: stocksData?.find(
            (stock) =>
              stock.size === size &&
              stock.color === color &&
              stock.product_id === currentProduct.id,
          )?.id,
          name: currentProduct.name,
          price: currentProduct.price,
          image: currentProduct.image,
          color,
          size,
          quantity,
        })
      } else {
        toast.error('Product is already added')
      }
    }
    toggleProductModal()
  }

  return (
    <div className='flex w-full'>
      <div className='px-[20px] md:w-[calc(100%-340px)] lg:w-[calc(100%-360px)] xl:w-[calc(100%-400px)]'>
        <div className='grid grid-cols-2 gap-4 pb-[20px] '>
          <SearchBar onValueChange={onSearch} />
          <SelectCategory onValueChange={onCategorySelect} />
        </div>
        {!!isBrowser && (
          <div className='grid grid-cols-3 gap-10 pb-[10px]'>
            {data
              .slice(
                pagination.pageIndex * pagination.pageSize,
                pagination.pageIndex * pagination.pageSize + pagination.pageSize,
              )
              .map((product) => (
                <ProductItem
                  key={product.name}
                  {...product}
                  onClick={() => productClick(product)}
                />
              ))}
          </div>
        )}
        {!!isBrowser && (
          <Pagination>
            <PaginationContent className='cursor-pointer'>
              <PaginationPrevious onClick={handlePreviousPage} />
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem
                  key={index}
                  onClick={() => setPagination({ ...pagination, pageIndex: index })}
                >
                  <PaginationLink isActive={index === pagination.pageIndex}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationNext onClick={() => handleNextPage(totalPages)} />
            </PaginationContent>
          </Pagination>
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
        <PosTab handleRemove={removeProduct} cancelOrder={removeAll}></PosTab>
      </div>
    </div>
  )
}
