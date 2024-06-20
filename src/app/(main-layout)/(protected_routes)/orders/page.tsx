'use client'
import SearchBar from './components/SearchBar'
import { OrderDate, OrderItem } from './components/OrderItem'
import ActionBar from './components/OrderActionBar'
import { Item, OrderDetails, ShipmentInfo } from './components/OrderDetails'
import { useMutation, useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { addressApi, orderApi } from '@/apis'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { IOrderResponse } from '@/interfaces/order'
import { cn } from '@/lib/utils'
import moment from 'moment'

const Filter: string[] = ['All Order', 'Success', 'Cancelled', 'Pending']

function OrdersManagementPage() {
  const [selectedOrder, setSelectedOrder] = useState<IOrderResponse | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [filter, setFilter] = useState<string>('All Order')

  const handleOrderClick = (order: IOrderResponse) => {
    setSelectedOrder(order)
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
    <div className='flex w-full flex-row p-[10px]'>
      <div className='flex max-h-screen w-1/4 flex-col'>
        <SearchBar onSearch={handleSearch} onSelectFilter={handleFilter} />
        <hr className='' />
        <div className={cn('flex flex-col overflow-y-auto')}>
          {ordersData
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
                className={cn('cursor-pointer', 'hover: bg-gray-100', {
                  'bg-[#DCEBFE]': selectedOrder && selectedOrder.id === order.id,
                  'bg-transparent': !(selectedOrder && selectedOrder.id === order.id),
                })}
                key={order.id}
              >
                <OrderItem order={order} onClick={handleOrderClick} />
              </div>
            ))}
        </div>
      </div>
      <hr className='' />
      <div className='flex w-3/4 flex-col'>
        {selectedOrder && <ActionBar order={selectedOrder} />}
        <div className='flex w-full flex-row'>
          <div className='w-3/5'>{selectedOrder && <OrderDetails order={selectedOrder} />}</div>
          <div className='w-2/5'>{selectedOrder && <ShipmentInfo order={selectedOrder} />}</div>
        </div>
      </div>
    </div>
  )
}

export default OrdersManagementPage
