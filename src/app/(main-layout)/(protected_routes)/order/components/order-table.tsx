'use client'

import { FILTER_INPUT_TYPE, ORDER_STATUS, ROLE_NAME } from '@/configs/enum'
import { orderColumns } from './order-columns'
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
  // const { isPending, data: queryData } = useQuery({
  //   queryKey: queryKeys.orders.gen(pagination.pageIndex),
  //   queryFn: () => orderApi.getAllOrders(pagination.pageSize, pagination.pageIndex + 1),
  //   placeholderData: (previousData) => previousData,
  // })

  const queryData = [
    {
      id: 'order1',
      customer: {
        id: 'cust1',
        fullname: 'John Doe',
      },
      confirmed_employee: {
        id: 'emp1',
        fullname: 'Jane Doe',
      },
      product_total_price: 100,
      order_date: new Date(),
      status: ORDER_STATUS.PENDING,
      total: 150,
    },
    {
      id: 'order2',
      customer: {
        id: 'cust2',
        fullname: 'Alice Smith',
      },
      confirmed_employee: {
        id: 'emp2',
        fullname: 'Bob Johnson',
      },
      product_total_price: 200,
      order_date: new Date(),
      status: ORDER_STATUS.DELIVERED,
      total: 250,
    },
    {
      id: 'order3',
      customer: {
        id: 'cust3',
        fullname: 'Charlie Brown',
      },
      confirmed_employee: {
        id: 'emp3',
        fullname: 'Eve Davis',
      },
      product_total_price: 300,
      order_date: new Date(),
      status: ORDER_STATUS.CANCELLED,
      total: 350,
    },
    {
      id: 'order4',
      customer: {
        id: 'cust4',
        fullname: 'David Wilson',
      },
      confirmed_employee: {
        id: 'emp4',
        fullname: 'Fiona Clark',
      },
      product_total_price: 400,
      order_date: new Date(),
      status: ORDER_STATUS.PACKAGING,
      total: 450,
    },
    {
      id: 'order5',
      customer: {
        id: 'cust5',
        fullname: 'Emma Thomas',
      },
      confirmed_employee: {
        id: 'emp5',
        fullname: 'George Harris',
      },
      product_total_price: 500,
      order_date: new Date(),
      status: ORDER_STATUS.IN_TRANSIT,
      total: 550,
    },
    {
      id: 'order6',
      customer: {
        id: 'cust6',
        fullname: 'Frank White',
      },
      confirmed_employee: {
        id: 'emp6',
        fullname: 'Hannah Martin',
      },
      product_total_price: 600,
      order_date: new Date(),
      status: ORDER_STATUS.RETURNED,
      total: 650,
    },
    {
      id: 'order7',
      customer: {
        id: 'cust7',
        fullname: 'Grace Lee',
      },
      confirmed_employee: {
        id: 'emp7',
        fullname: 'Ian Walker',
      },
      product_total_price: 700,
      order_date: new Date(),
      status: ORDER_STATUS.UNDELIVERED,
      total: 750,
    },
  ]

  const data = queryData.map((order) => ({
    id: order.id,
    customer: order.customer.fullname,
    confirmed_employee: order.confirmed_employee.fullname,
    product_total_price: order.product_total_price,
    order_date: order.order_date,
    status: order.status,
    total: order.total,
  }))

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
          filterInput={filterInput}
          showAddButton={false}
        />
      )}
    </>
  )
}
