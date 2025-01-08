'use client'

import { FILTER_INPUT_TYPE, ORDER_STATUS, PAYMENT_TYPE, ROLE_NAME } from '@/configs/enum'
import { IOrderCol, orderColumns } from './order-columns'
import { DataTable } from '@/components/shared'
import { useBrowser } from '@/hooks'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { orderApi } from '@/apis'
import { IFilterInput } from '@/interfaces'
import { PaginationState } from '@tanstack/react-table'

const filterInput: IFilterInput[] = [
  {
    key: 'customer',
    title: 'Customer',
    type: FILTER_INPUT_TYPE.TEXTBOX,
  },
  {
    key: 'status',
    title: 'Status',
    type: FILTER_INPUT_TYPE.TEXTBOX,
  },
]

export default function OrderTable({ accountRole }: { accountRole: ROLE_NAME }) {
  const { isBrowser } = useBrowser()
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const { isPending, data: queryData } = useQuery({
    queryKey: queryKeys.orders.gen(pagination.pageIndex),
    queryFn: () => orderApi.getAllOrders(pagination.pageSize, pagination.pageIndex + 1),
    placeholderData: (previousData) => previousData,
  })

  const data: IOrderCol[] = queryData?.map((item: IOrder) => {
    return {
      id: item.id,
      order_code: item.order_code,
      order_date: moment(item.order_date).format('DD-MM-YYYY'),
      status: item.status,
      payment_type: item.payment_type,
      product_total_price: item.product_total_price,
      customer: item.customer.fullname,
      confirmed_employee: item.confirmed_employee?.fullname,
      total: item.total,
    }
  }) as IOrderCol[]

  return (
    <>
      {!!isBrowser && !isPending && (
        <DataTable
          columns={orderColumns(accountRole)}
          data={data}
          title='Orders'
          queryKey='orders'
          pagination={pagination}
          setPagination={setPagination}
          pageCount={data.length > 0 ? Math.ceil(data[0].total / pagination.pageSize) : 0}
          filterInput={eventFilterInput}
          showAddButton={false}
        />
      )}
    </>
  )
}
