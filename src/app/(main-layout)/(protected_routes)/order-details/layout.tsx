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
  const [selectedOrder, setSelectedOrder] = useState<IOrderByIdResponse | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [filter, setFilter] = useState<string>('All Order')
  const router = useRouter()
  const pathName = usePathname()

  const handleOrderClick = (order: IOrderByIdResponse) => {
    setSelectedOrder(order)
    router.push(`${PATH_NAME.ORDER_DETAILS}/${order.id}`)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleFilter = (filter: string) => {
    setFilter(filter)
  }

  // const { data: ordersData } = useQuery({
  //   queryKey: queryKeys.allOrders.gen(),
  //   queryFn: () => orderApi.getAllOrders(),
  //   enabled: pathName.includes(PATH_NAME.ORDER_DETAILS),
  // })

  const ordersData: IOrderByIdResponse[] = [
    {
      id: '1',
      order_code: 'ORD-001',
      customer: {
        id: '1',
        fullname: 'John Doe',
      },
      confirmed_employee: {
        id: '2',
        fullname: 'Jane Smith',
      },
      voucher: {
        id: '3',
        code: 'DISCOUNT10',
        voucher_value: 10,
      },
      group_media: {
        id: '4',
        media_list: {
          id: '5',
          type: MEDIA_TYPE.IMAGE,
          url: 'https://example.com/image.jpg',
        },
      },
      product_total_price: 100,
      order_date: new Date(),
      status: ORDER_STATUS.PENDING,
      payment_time: new Date(),
      payment_type: PAYMENT_TYPE.BANK,
      review_content: 'Great product!',
      review_star: 5,
      shipment: {
        id: '6',
        shipping_address: '123 Main St, Anytown, USA',
        shipped_date: new Date(),
        completed_date: new Date(),
      },
      order_details: [
        {
          stock: {
            id: '7',
            size: SIZE.M,
            color: 'Red',
            product: {
              id: '8',
              name: 'T-Shirt',
              selling_price: '20',
            },
          },

          quantity: 2,
        },
      ],
    },
  ]

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
            // ?.sort(
            //   (a: any, b: any) =>
            //     new Date(b.order_date).getTime() - new Date(a.order_date).getTime(),
            // )
            // ?.filter((order: any) => {
            //   const matchesSearch =
            //     order.order_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            //     moment(order.order_date).format('DD-MM-YYYY').includes(searchQuery.toLowerCase()) ||
            //     order.status.toLowerCase().includes(searchQuery.toLowerCase())

            //   const filterSearch =
            //     filter === 'All Order' ||
            //     (filter === 'Success' && order.status.toLowerCase() === 'success') ||
            //     (filter === 'Cancelled' && order.status.toLowerCase() === 'cancelled') ||
            //     (filter === 'Pending' && order.status.toLowerCase() === 'pending')

            //   return matchesSearch && filterSearch
            // })
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
