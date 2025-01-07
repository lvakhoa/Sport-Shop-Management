'use client'

import { orderApi } from '@/apis'
import { queryKeys } from '@/configs'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import ActionBar from '../components/OrderActionBar'
import { OrderDetails, ShipmentInfo } from '../components/OrderDetails'
import { MEDIA_TYPE, ORDER_STATUS, PAYMENT_TYPE, SIZE } from '@/configs/enum'
import { IOrderByIdResponse } from '@/interfaces/order'

function OrderDetailsPage() {
  const { id: orderId } = useParams<{ id: string }>()

  // const { data: ordersData, isLoading } = useQuery({
  //   queryKey: queryKeys.orderDetails.gen(orderId),
  //   queryFn: () => orderApi.getOrderById(orderId),
  //   enabled: !!orderId,
  // })

  const ordersData: IOrderByIdResponse = {
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
  }

  return (
    <div className='flex h-auto grow-[3] flex-col'>
      {/* {!isLoading && !!ordersData && ( */}
      {!!ordersData && (
        <>
          <ActionBar order={ordersData} />
          <div className='grid grid-cols-1 sm:grid-cols-2'>
            <div>
              <OrderDetails order={ordersData} />
            </div>
            <div className='max-w-[360px]'>
              <ShipmentInfo order={ordersData} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default OrderDetailsPage
