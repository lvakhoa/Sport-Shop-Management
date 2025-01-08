'use client'

import { queryKeys } from '@/configs'
import { useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { orderApi } from '@/apis'
import { OrderItem } from '../../../order-details/components/OrderItem'
import { PATH_NAME } from '@/configs'
import { ContentCard } from '@/components/shared'
import { Card } from '@/components/shared/card'

function OrderPage() {
  const router = useRouter()
  const { data: ordersData } = useQuery({
    queryKey: queryKeys.allOrders.gen(),
    queryFn: () => orderApi.getAllOrdersOfCustomer(),
  })

  return (
    <ContentCard title='Orders'>
      {ordersData && ordersData.length > 0 && (
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
          {ordersData.map((order) => (
            <Card key={order.id} className='cursor-pointer'>
              <OrderItem
                order={order}
                onClick={() => router.push(`${PATH_NAME.ORDER_DETAILS}/${order.id ?? ''}`)}
              />
            </Card>
          ))}
        </div>
      )}
      {ordersData && !ordersData.length && (
        <div className='flex h-60 items-center justify-center'>No orders found</div>
      )}
    </ContentCard>
  )
}

export default OrderPage
