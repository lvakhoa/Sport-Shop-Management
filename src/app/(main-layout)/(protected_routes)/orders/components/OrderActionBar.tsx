import { Button } from '@/components/shared'
import { PaidLabel } from './PaymentStatusLabel'
import { ConfirmLabel, DeliveredLabel } from './ShipmentStatusLabel'
import Image from 'next/image'
import { IOrderResponse, IOrderUpdateRequest } from '@/interfaces/order'
import { DecodeError } from 'next/dist/shared/lib/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { orderApi } from '@/apis'
import { toast } from 'react-toastify'
import { queryKeys } from '@/configs'
import { useProfile } from '@/hooks'
import { useState } from 'react'

function ActionBar({ order }: { order: IOrderResponse }) {
  const [confirm, setConfirm] = useState<string | undefined>(order.confirmed_employee_id)
  const profile = useProfile()
  const queryClient = useQueryClient()
  const { mutate: editOrder } = useMutation({
    mutationFn: (data: IOrderUpdateRequest) =>
      orderApi.updateOrder(
        {
          account_id: data.account_id,
          customer_id: data.customer_id,
          confirmed_employee_id: data.confirmed_employee_id,
          product_total_price: data.product_total_price,
          status: data.status,
          buy_in_app: data.buy_in_app,
        },
        order.id,
      ),
    onSuccess: () => {
      toast.success('Confirm order successfully')
    },
    onError: () => {
      toast.error('Error updating order')
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'orderDetails',
      })
      await queryClient.invalidateQueries({ queryKey: queryKeys.orderDetails.gen(order.id) })
    },
  })

  const handleConfirm = () => {
    const updateData: IOrderUpdateRequest = {
      account_id: order.account_id,
      customer_id: order.customer_id,
      confirmed_employee_id: profile.data?.id || order.confirmed_employee_id,
      product_total_price: parseFloat(order.product_total_price),
      status: order.status,
      buy_in_app: order.buy_in_app,
    }
    editOrder(updateData)
    setConfirm(profile.data?.id)
  }

  return (
    <div className='flex w-full flex-row items-center justify-between px-[20px] py-[10px]'>
      <div className='flex flex-col space-y-[5px]'>
        <span className='font-semibold'>Order {order.order_no}</span>
        <div className='flex flex-row space-x-[5px]'>
          {confirm === null ? <Button onClick={handleConfirm}>Confirm</Button> : <ConfirmLabel />}
        </div>
      </div>
      <div className='flex flex-row space-x-[5px]'>
        <Button className='flex gap-[5px] rounded-[5px] bg-[#D4E0FF] px-2 py-1 duration-300 hover:bg-[#EBF1FF]'>
          <Image src='assets/icons/print.svg' alt='' width={22} height={22} />
        </Button>
        <Button>Return</Button>
      </div>
    </div>
  )
}

export default ActionBar
