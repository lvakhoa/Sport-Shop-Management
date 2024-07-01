'use client'

import { FILTER_INPUT_TYPE, STATUS } from '@/configs/enum'
import { columns, CreateProductForm, IProduct } from './components'
import { DataTable } from '@/components/shared'
import { useBrowser } from '@/hooks'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { productApi } from '@/apis'
import { IFilterInput } from '@/interfaces'
import { PaginationState } from '@tanstack/react-table'
import { currencyFormatter } from '@/helpers'
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
  {
    key: 'status',
    title: 'Status',
    type: FILTER_INPUT_TYPE.DROPDOWN,
    dropdownItems: [STATUS.ACTIVE, STATUS.INACTIVE],
  },
]

export default function ProductsManagementPage() {
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

  const data: IProduct[] =
    queryData?.map((item) => {
      return {
        id: item.id,
        name: item.name,
        category: item.category_list.length > 0 ? item.category_list[0].category.name : '',
        listPrice: currencyFormatter(Number(item.list_price)),
        sellingPrice: currencyFormatter(Number(item.selling_price)),
        status: item.status ? (
          <div className='rounded-md bg-[#D4FFE0] px-2 py-1 text-[#46C574]'>{STATUS.ACTIVE}</div>
        ) : (
          <div className='bg-[#FFD4D7] text-[#F23E14]'>{STATUS.INACTIVE}</div>
        ),
        total: item.total,
      }
    }) ?? []

  return (
    <div className='container mx-auto py-10'>
      {!!isBrowser && (
        <DataTable
          columns={columns}
          data={data}
          title='Products'
          addContentSidebar={<CreateProductForm />}
          pagination={pagination}
          setPagination={setPagination}
          filterInput={productFilterInput}
          isPending={isPending}
          pageCount={data.length > 0 ? Math.ceil(data[0].total / pagination.pageSize) : 0}
          showRestoreButton={true}
          restore7daysFn={() =>
            productApi.restoreProduct(moment().subtract(7, 'days').utc().unix().valueOf())
          }
          restore30daysFn={() =>
            productApi.restoreProduct(moment().subtract(30, 'days').utc().unix().valueOf())
          }
          restoreAllFn={() => productApi.restoreProduct()}
        />
      )}
    </div>
  )
}
