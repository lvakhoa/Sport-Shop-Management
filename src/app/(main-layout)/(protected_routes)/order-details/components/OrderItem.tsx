'use client'
import { IAllOrdersResponse } from '@/interfaces/order'
import { ORDER_STATUS } from '@/configs/enum'
import {
  CancelledLabel,
  DeliveredLabel,
  InTransitLabel,
  PackagingLabel,
  PendingLabel,
  ReturnedLabel,
  UndeliveredLabel,
} from './ShipmentStatusLabel'
import { queryKeys } from '@/configs'
import { employeeApi } from '@/apis'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import { currencyFormatter } from '@/helpers'

function OrderItem({
  order,
  onClick,
}: {
  order: IAllOrdersResponse
  onClick: (order: IAllOrdersResponse) => void
}) {
  const { data: employeeData, isLoading } = useQuery({
    queryKey: queryKeys.employeeDetails.gen(order.confirmed_employee?.id ?? ''),
    queryFn: () => employeeApi.getEmployeesById(order.confirmed_employee?.id ?? ''),
    enabled: !!order.confirmed_employee?.id,
  })

  const getStatusLabel = (status: string) => {
    switch (status) {
      case ORDER_STATUS.PENDING:
        return <PendingLabel />
      case ORDER_STATUS.PACKAGING:
        return <PackagingLabel />
      case ORDER_STATUS.IN_TRANSIT:
        return <InTransitLabel />
      case ORDER_STATUS.CANCELLED:
        return <CancelledLabel />
      case ORDER_STATUS.DELIVERED:
        return <DeliveredLabel />
      case ORDER_STATUS.RETURNED:
        return <ReturnedLabel />
      case ORDER_STATUS.UNDELIVERED:
        return <UndeliveredLabel />
      default:
        return <PendingLabel />
    }
  }

  return (
    <div className='flex flex-col p-[10px]' onClick={() => onClick(order)}>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-col'>
          <span className='text-[12px]'>{moment(order.order_date).format('DD-MM-YYYY')}</span>
          <span className='text-[16px] font-semibold'>{order.order_code}</span>
          <span className='text-[14px]'>{order.payment_type}</span>
        </div>

        <div className='flex flex-col items-end space-y-[5px]'>
          {getStatusLabel(order.status)}
          <span className='text-[16px] font-semibold'>
            {currencyFormatter(order.product_total_price)}
          </span>
        </div>
      </div>
      <span className='text-[14px]'>
        {!isLoading && !!employeeData ? 'Employee: ' + employeeData.fullname : ''}
      </span>
    </div>
  )
}

function OrderDate() {
  return (
    <div className='w-full bg-[#E6E7EA] p-[10px]'>
      <span className='text-[14px]'>Sunday - 28/04/2024</span>
    </div>
  )
}

export { OrderItem, OrderDate }
