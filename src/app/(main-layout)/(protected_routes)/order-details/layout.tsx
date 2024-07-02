'use client'

import SearchBar from './components/SearchBar'
import { OrderItem } from './components/OrderItem'
import { useQuery } from '@tanstack/react-query'
import { PATH_NAME, queryKeys } from '@/configs'
import { orderApi } from '@/apis'
import { useState } from 'react'
import { IOrderResponse } from '@/interfaces/order'
import { cn } from '@/lib/utils'
import moment from 'moment'
import { useRouter } from 'next/navigation'

function OrdersManagementLayout({ children }: { children: React.ReactNode }) {
  const [selectedOrder, setSelectedOrder] = useState<IOrderResponse | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [filter, setFilter] = useState<string>('All Order')
  const router = useRouter()

  const handleOrderClick = (order: IOrderResponse) => {
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
  })

  return (
    <div className='flex w-full flex-row px-[10px]'>
      <div className='hover:overflow flex max-h-[calc(100vh-var(--header-height))] max-w-[224px] grow flex-col'>
        <SearchBar onSearch={handleSearch} onSelectFilter={handleFilter} />
        <hr className='' />
        <div
          className={cn(
            'scrollbar',
            'flex max-h-[calc(100vh-var(--header-height)-120px)] flex-col overflow-hidden hover:overflow-auto',
          )}
        >
          {ordersData
            ?.sort(
              (a: IOrderResponse, b: IOrderResponse) =>
                new Date(b.order_date).getTime() - new Date(a.order_date).getTime(),
            )
            ?.filter((order: IOrderResponse) => {
              const matchesSearch =
                order.order_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
                moment(order.order_date).format('DD-MM-YYYY').includes(searchQuery.toLowerCase()) ||
                order.status.toLowerCase().includes(searchQuery.toLowerCase())

              const filterSearch =
                filter === 'All Order' ||
                (filter === 'Success' && order.status.toLowerCase() === 'success') ||
                (filter === 'Cancelled' && order.status.toLowerCase() === 'cancelled') ||
                (filter === 'Pending' && order.status.toLowerCase() === 'pending')

              return matchesSearch && filterSearch
            })
            .map((order: IOrderResponse) => (
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
