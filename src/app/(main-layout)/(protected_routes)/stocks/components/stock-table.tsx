'use client'

import { FILTER_INPUT_TYPE, ROLE_NAME } from '@/configs/enum'
import { IStockCol, stockColumns } from './stock-columns'
import { DataTable } from '@/components/shared'
import { useBrowser } from '@/hooks'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { stockApi } from '@/apis'
import { IFilterInput } from '@/interfaces'
import { PaginationState } from '@tanstack/react-table'
import { IStock } from '@/interfaces/stock'
import moment from 'moment'
import CreateStockForm from './create-stock'
import CsvFormDialog from './csv-form-dialog'

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

export default function StockTable({ accountRole }: { accountRole: ROLE_NAME }) {
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

  const data: IStockCol[] =
    queryData?.map((item) => {
      return {
        id: item.id,
        name: item.name,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        productName: item.product.name,
        total: item.total,
      }
    }) ?? []

  return (
    <>
      {!!isBrowser && (
        <DataTable
          columns={stockColumns(accountRole)}
          data={data}
          title='Stocks'
          queryKey='stocks'
          addContentSidebar={<CreateStockForm />}
          pagination={pagination}
          setPagination={setPagination}
          filterInput={stockFilterInput}
          isPending={isPending}
          pageCount={data.length > 0 ? Math.ceil(data[0].total / pagination.pageSize) : 0}
          csvFormDialog={<CsvFormDialog />}
          showImportButton={accountRole === ROLE_NAME.ADMIN}
          showAddButton={accountRole === ROLE_NAME.ADMIN}
        />
      )}
    </>
  )
}
