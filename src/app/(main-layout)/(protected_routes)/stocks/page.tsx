'use client'

import { FILTER_INPUT_TYPE, STATUS } from '@/configs/enum'
import { columns, IStock } from './components'
import { DataTable } from '@/components/shared'
import { useBrowser } from '@/hooks'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { stockApi } from '@/apis'
import { IFilterInput } from '@/interfaces'
import { PaginationState } from '@tanstack/react-table'
import { currencyFormatter } from '@/helpers'
import moment from 'moment'
import CreateStockForm from './components/create-stock'

const stockFilterInput: IFilterInput[] = [
  {
    key: 'product_name',
    title: 'Name',
    type: FILTER_INPUT_TYPE.TEXTBOX,
  },
  {
    key: 'size',
    title: 'Size',
    type: FILTER_INPUT_TYPE.DROPDOWN,
  },
  {
    key: 'color',
    title: 'Color',
    type: FILTER_INPUT_TYPE.DROPDOWN,
  },
  {
    key: 'quantity_in_stock',
    title: 'Quantity',
    type: FILTER_INPUT_TYPE.TEXTBOX,
  },
]

export default function StockManagementPage() {
  const { isBrowser } = useBrowser()
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const { isPending, data: queryData } = useQuery({
    queryKey: queryKeys.stocks.gen(pagination.pageIndex),
    queryFn: () => stockApi.getAllStock(pagination.pageSize, pagination.pageIndex + 1),
    placeholderData: (previousData) => previousData,
  })

  const data: IStock[] =
    queryData?.map((item) => {
      return {
        id: item.id,
        product_name: item.product.name,
        size: item.size,
        color: item.color.name,
        quantity_in_stock: item.quantity_in_stock,
        total: item.total,
      }
    }) ?? []

  return (
    <div className='container mx-auto py-10'>
      {!!isBrowser && (
        <DataTable
          columns={columns}
          data={data}
          title='Stocks'
          addContentSidebar={<CreateStockForm />}
          pagination={pagination}
          setPagination={setPagination}
          filterInput={stockFilterInput}
          isPending={isPending}
          pageCount={data.length > 0 ? Math.ceil(data[0].total / pagination.pageSize) : 0}
          showRestoreButton={true}
          restore7daysFn={() =>
            stockApi.restoreStock(moment().subtract(7, 'days').utc().unix().valueOf())
          }
          restore30daysFn={() =>
            stockApi.restoreStock(moment().subtract(30, 'days').utc().unix().valueOf())
          }
          restoreAllFn={() => stockApi.restoreStock()}
        />
      )}
    </div>
  )
}
