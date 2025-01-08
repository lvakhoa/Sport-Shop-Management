'use client'

import SearchBar from './components/SearchBar'
import { OrderItem } from './components/OrderItem'
import { useQuery } from '@tanstack/react-query'
import { PATH_NAME, queryKeys } from '@/configs'
import { orderApi } from '@/apis'
import { useState } from 'react'
import { IAllOrdersResponse, IOrder, IOrderByIdResponse } from '@/interfaces/order'
import { cn } from '@/lib/utils'
import moment from 'moment'
import { usePathname, useRouter } from 'next/navigation'
import { MEDIA_TYPE, ORDER_STATUS, PAYMENT_TYPE, SIZE } from '@/configs/enum'

function OrdersManagementLayout({ children }: { children: React.ReactNode }) {
  const [selectedOrder, setSelectedOrder] = useState<IAllOrdersResponse | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [filter, setFilter] = useState<string>('All Order')
  const router = useRouter()
  const pathName = usePathname()

  const handleOrderClick = (order: IAllOrdersResponse) => {
    setSelectedOrder(order)
    router.push(`${PATH_NAME.ORDER_DETAILS}/${order.id}`)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleFilter = (filter: string) => {
    setFilter(filter)
  }

  const { data: ordersData } = useQuery({
    queryKey: queryKeys.allOrders.gen(),
    queryFn: () => orderApi.getAllOrders(),
    enabled: pathName.includes(PATH_NAME.ORDER_DETAILS),
  })

  return (
    <div className='flex w-full flex-row px-[10px]'>
      <div className='hover:overflow flex max-h-[calc(100vh-var(--header-height))] max-w-[260px] grow flex-col'>
        <SearchBar onSearch={handleSearch} onSelectFilter={handleFilter} />
        <hr className='' />
        <div
          className={cn(
            'scrollbar',
            'flex max-h-[calc(100vh-var(--header-height)-120px)] flex-col overflow-hidden hover:overflow-auto',
          )}
        >
          {ordersData &&
            ordersData
              ?.sort(
                (a: any, b: any) =>
                  new Date(b.order_date).getTime() - new Date(a.order_date).getTime(),
              )
              ?.filter((order) => {
                const matchesSearch =
                  order.order_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  moment(order.order_date)
                    .format('DD-MM-YYYY')
                    .includes(searchQuery.toLowerCase()) ||
                  order.status.toLowerCase().includes(searchQuery.toLowerCase())

                const filterSearch =
                  filter === 'All Order' ||
                  (filter === 'Delivered' && order.status === 'DELIVERED') ||
                  (filter === 'In Transit' && order.status === 'IN_TRANSIT') ||
                  (filter === 'Packaging' && order.status === 'PACKAGING') ||
                  (filter === 'Cancelled' && order.status === 'CANCELLED') ||
                  (filter === 'Returned' && order.status === 'RETURNED') ||
                  (filter === 'Undelivered' && order.status === 'UNDELIVERED') ||
                  (filter === 'Pending' && order.status === 'PENDING')

                return matchesSearch && filterSearch
              })
              .map((order) => (
                <div
                  className={cn('cursor-pointer', 'border-b border-b-gray-300 duration-150', {
                    'bg-[#DCEBFE]': selectedOrder && selectedOrder.id === order.id,
                    'bg-transparent hover:bg-gray-100': !(
                      selectedOrder && selectedOrder.id === order.id
                    ),
                  })}
                  key={order.id}
                >
                  <OrderItem order={order} onClick={handleOrderClick} />
                </div>
              ))}
        </div>
        <hr />
      </div>
      {children}
    </div>
  )
}

export default OrdersManagementLayout
