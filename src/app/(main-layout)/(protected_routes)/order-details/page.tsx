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
import { useProfile } from '@/hooks'
import { ORDER_STATUS } from '@/configs/enum'

function OrdersManagementPage() {
  const [selectedOrder, setSelectedOrder] = useState<IOrderResponse | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [filter, setFilter] = useState<string>('All Order')
  const profile = useProfile()

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

  // useEffect(() => {
  //   if (ordersData && ordersData.length > 0) {
  //     setSelectedOrder(ordersData[0])
  //   } else {
  //     setSelectedOrder(null)
  //   }
  // }, [ordersData])

  const handleConfirmOrder = () => {
    setSelectedOrder((prevOrder) => ({
      ...prevOrder!,
      status: ORDER_STATUS.SUCCESS,
    }))
  }

  const handleCancelOrder = () => {
    setSelectedOrder((prevOrder) => ({
      ...prevOrder!,
      status: ORDER_STATUS.CANCELLED,
    }))
  }

  return (
    <div className='flex w-full flex-row px-[10px]'>
      <div className='hover:overflow flex max-h-[calc(100vh-var(--header-height))] w-1/4 flex-col'>
        <SearchBar onSearch={handleSearch} onSelectFilter={handleFilter} />
        <hr className='' />
        <div className='flex max-h-[calc(100vh-var(--header-height))] flex-col overflow-y-scroll'>
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
      <div className='flex h-screen w-3/4 flex-col'>
        {selectedOrder && (
          <ActionBar
            order={selectedOrder}
            onConfirm={handleConfirmOrder}
            onCancel={handleCancelOrder}
          />
        )}
        {selectedOrder ? (
          <div className='flex w-full flex-row'>
            <div className='w-3/5'>
              <OrderDetails order={selectedOrder} />
            </div>
            <div className='w-2/5'>
              <ShipmentInfo order={selectedOrder} />
            </div>
          </div>
        ) : (
          <div className='flex h-full w-full items-center justify-center'>
            <span className='text-center'>Select Order To See Details</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrdersManagementPage
