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
  const { id: userId } = useParams<{ id: string }>()
  const router = useRouter()
  const { data: ordersData } = useQuery({
    queryKey: queryKeys.allOrders.gen(),
    queryFn: () => orderApi.getAllOrders(),
  })

  const orders = ordersData?.filter((order) => order.customer_id === userId) ?? []

  return (
    <ContentCard title='Orders'>
      {orders && orders.length > 0 && (
        <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
          {orders.map((order) => (
            <Card key={order.id} className='cursor-pointer'>
              <OrderItem
                order={order}
                onClick={() => router.push(`${PATH_NAME.ORDER_DETAILS}/${order.id ?? ''}`)}
              />
            </Card>
          ))}
        </div>
      )}
      {!orders.length && (
        <div className='flex h-60 items-center justify-center'>No orders found</div>
      )}
    </ContentCard>
  )
}

export default OrderPage
