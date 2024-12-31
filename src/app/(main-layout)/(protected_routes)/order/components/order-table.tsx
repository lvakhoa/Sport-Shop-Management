'use client'

import { FILTER_INPUT_TYPE, ORDER_STATUS, PAYMENT_TYPE, ROLE_NAME } from '@/configs/enum'
import { orderColumns } from './order-columns'
import { DataTable } from '@/components/shared'
import { useBrowser } from '@/hooks'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { orderApi } from '@/apis'
import { IFilterInput } from '@/interfaces'
import { PaginationState } from '@tanstack/react-table'
import { IOrder } from '@/interfaces/order'
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

  const data: IOrder[] = [
    {
      id: 'order1',
      order_code: 'ORD001',
      customer_id: 'cust1',
      confirming_employee_id: undefined,
      voucher_id: 'voucher1',
      group_media_id: 'groupmedia1',
      product_total_price: 100,
      order_date: new Date(),
      status: ORDER_STATUS.PENDING,
      payment_type: PAYMENT_TYPE.BANK,
      payment_time: new Date(),
      review_star: 5,
      review_content: 'Great service!',
      confirmed_employee: undefined,
      customer: {
        id: 'cust1',
        fullname: 'John Doe',
        phone: '123456789',
        gender: undefined,
        avatar_url: undefined,
        addresses: [],
        user: {
          id: 'user1',
          group_user_id: 'group1',
          role_name: ROLE_NAME.CUSTOMER,
          email: 'john.doe@example.com',
          password: 'password',
          is_active: true,
          customer: undefined,
          employee: undefined,
          sessions: [],
          tokens: [],
          group_user: {
            id: 'group1',
            title: 'Customer Group',
            description: 'Group for all customers',
            applied_role: ROLE_NAME.CUSTOMER,
            users: [],
            granted_permissions: [],
          },
          voucher_usages: [],
        },
        notifications: [],
        orders: [],
        selected_product: [],
        favorite_products: [],
        total: 1,
      },
      group_media: undefined,
      voucher: undefined,
      ordered_products: [],
      shipment: undefined,
      total: 150,
    },
  ]

  return (
    <>
      {!!isBrowser && (
        <DataTable
          columns={orderColumns(accountRole)}
          data={data}
          title='Orders'
          queryKey='orders'
          pagination={pagination}
          setPagination={setPagination}
          filterInput={eventFilterInput}
          showAddButton={false}
        />
      )}
    </>
  )
}
