'use client'

import { FILTER_INPUT_TYPE, ROLE_NAME } from '@/configs/enum'
import { productColumns } from './product-columns'
import CreateProductForm from './create-product'
import { DataTable } from '@/components/shared'
import { useBrowser } from '@/hooks'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { productApi } from '@/apis'
import { IFilterInput } from '@/interfaces'
import { PaginationState } from '@tanstack/react-table'
import { currencyFormatter } from '@/helpers'
import { IProduct, IProductDisplay } from '@/interfaces/product'
import moment from 'moment'

const productFilterInput: IFilterInput[] = [
  {
    key: 'name',
    title: 'Name',
    type: FILTER_INPUT_TYPE.TEXTBOX,
  },
  {
    key: 'category',
    title: 'Category',
    type: FILTER_INPUT_TYPE.TEXTBOX,
  },
  {
    key: 'listPrice',
    title: 'Buying Price',
    type: FILTER_INPUT_TYPE.TEXTBOX,
  },
  {
    key: 'sellingPrice',
    title: 'Selling Price',
    type: FILTER_INPUT_TYPE.TEXTBOX,
  },
]

export default function ProductTable({ accountRole }: { accountRole: ROLE_NAME }) {
  const { isBrowser } = useBrowser()
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const { isPending, data: queryData } = useQuery({
    queryKey: queryKeys.products.gen(pagination.pageIndex),
    queryFn: () => productApi.getAllProduct(pagination.pageSize, pagination.pageIndex + 1),
    placeholderData: (previousData) => previousData,
  })

  const data: IProductDisplay[] =
    queryData?.map((item) => {
      return {
        id: item.id,
        name: item.name,
        brand: item.brand.name,
        sport: item.sport.name,
        isActive: item.is_active,
        category: item.categories[0].name,
        listPrice: item.list_price,
        sellingPrice: item.selling_price,
        total: item.total,
      }
    }) ?? []

  return (
    <>
      {!!isBrowser && (
        <DataTable
          columns={productColumns(accountRole)}
          data={data}
          title='Products'
          queryKey='products'
          addContentSidebar={<CreateProductForm />}
          pagination={pagination}
          setPagination={setPagination}
          filterInput={productFilterInput}
          isPending={isPending}
          pageCount={data.length > 0 ? Math.ceil(data[0].total / pagination.pageSize) : 0}
          showAddButton={accountRole !== ROLE_NAME.CUSTOMER}
          showRestoreButton={false}
          restore7daysFn={() =>
            productApi.restoreProduct(moment().subtract(7, 'days').utc().unix().valueOf())
          }
          restore30daysFn={() =>
            productApi.restoreProduct(moment().subtract(30, 'days').utc().unix().valueOf())
          }
          restoreAllFn={() => productApi.restoreProduct()}
        />
      )}
    </>
  )
}
