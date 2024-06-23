'use client'
import { IOrderResponse } from '@/interfaces/order'
import { PaidLabel, CODLabel } from './PaymentStatusLabel'
import {
  CancelledLabel,
  DeliveredLabel,
  InTransitLabel,
  PendingLabel,
  SuccessLabel,
} from './ShipmentStatusLabel'
import { queryKeys } from '@/configs'
import { employeeApi } from '@/apis'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import moment from 'moment'

function OrderItem({
  order,
  onClick,
}: {
  order: IOrderResponse
  onClick: (order: IOrderResponse) => void
}) {
  const { data: employeeData } = useQuery({
    queryKey: queryKeys.employeeDetails.gen(order.confirmed_employee_id),
    queryFn: () => employeeApi.getEmployeesById(order.confirmed_employee_id),
  })
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <PendingLabel />
      case 'SUCCESS':
        return <SuccessLabel />
      case 'CANCELLED':
        return <CancelledLabel />
      default:
        return null
    }
  }

  return (
    <div className='flex flex-col p-[10px]' onClick={() => onClick(order)}>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-col'>
          <span className='text-[12px]'>{moment(order.order_date).format('DD-MM-YYYY')}</span>
          <span className='text-[16px] font-semibold'>{order.order_no}</span>
          <span className='text-[14px]'>{order.buy_in_app ? 'Online' : 'POS'}</span>
        </div>

        <div className='flex flex-col items-end space-y-[5px]'>
          {getStatusLabel(order.status)}
          {/* <span className='text-[16px] font-semibold'>{order.total}₫</span> */}
        </div>
      </div>
      <span className='text-[14px]'>
        {employeeData ? 'Employee: ' + employeeData.fullname : ''}
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
