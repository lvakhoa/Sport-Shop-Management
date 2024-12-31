'use client'

import { FILTER_INPUT_TYPE, ROLE_NAME } from '@/configs/enum'
import { orderColumns } from './order-columns'
import { DataTable } from '@/components/shared'
import { useBrowser } from '@/hooks'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { orderApi } from '@/apis'
import { IFilterInput } from '@/interfaces'
import { PaginationState } from '@tanstack/react-table'
import moment from 'moment'

const eventFilterInput: IFilterInput[] = [
  {
    key: 'order_code',
    title: 'Order Code',
    type: FILTER_INPUT_TYPE.TEXTBOX,
  },
]

export default function OrderTable({ accountRole }: { accountRole: ROLE_NAME }) {
  const { isBrowser } = useBrowser()
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  // const { isPending, data: queryData } = useQuery({
  //   queryKey: queryKeys.orders.gen(pagination.pageIndex),
  //   queryFn: () => orderApi.getAllOrders(pagination.pageSize, pagination.pageIndex + 1),
  //   placeholderData: (previousData) => previousData,
  // })

  // const data: IOrder[] =
  //   queryData?.map((item) => {
  //     return {
  //       id: item.id,
  //       order_code: item.order_code,
  //       product_total_price: item.product_total_price,
  //       order_date: moment(item.order_date).format('DD/MM/YYYY'),
  //       status: item.status,
  //       payment_type: item.payment_type,
  //       review_star: item.review_star,
  //       customer: item.customer,
  //       order_details: item.order_details,
  //       total: item.total,
  //     }
  //   }) ?? []

  return (
    <>
      {!!isBrowser && (
        <DataTable
          columns={orderColumns(accountRole)}
          data={[]}
          title='Orders'
          queryKey='orders'
          pagination={pagination}
          setPagination={setPagination}
          filterInput={eventFilterInput}
          // isPending={isPending}
          // pageCount={data.length > 0 ? Math.ceil(data[0].total / pagination.pageSize) : 0}
          showAddButton={false}
        />
      )}
    </>
  )
}
