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

  const { data: ordersData, isLoading } = useQuery({
    queryKey: queryKeys.orderDetails.gen(orderId),
    queryFn: () => orderApi.getOrderById(orderId),
    enabled: !!orderId,
  })

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
