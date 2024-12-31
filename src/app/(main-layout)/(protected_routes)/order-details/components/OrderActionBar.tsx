import { Button } from '@/components/shared'
import { CancelledLabel, ConfirmLabel } from './ShipmentStatusLabel'
import { IOrder, IOrderUpdateRequest } from '@/interfaces/order'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { orderApi, shipmentApi } from '@/apis'
import { toast } from 'react-toastify'
import { queryKeys } from '@/configs'
import { useProfile } from '@/hooks'
import { useRef } from 'react'
import { createPortal } from 'react-dom'
import Invoice from './Invoice'
import { ORDER_STATUS } from '@/configs/enum'
import { Printer } from 'lucide-react'
import { IShipmentUpdateRequest } from '@/interfaces/shipment'
import moment from 'moment'

function ActionBar({ order }: { order: IOrder }) {
  const profile = useProfile()
  const queryClient = useQueryClient()

  const printRef = useRef<HTMLDivElement>(null)

  const { mutate: editOrder } = useMutation({
    mutationFn: (data: Partial<IOrderUpdateRequest>) => orderApi.updateOrder(data, order.id),
    onSuccess: () => {
      toast.success('Updating order successfully')
    },
    onError: () => {
      toast.error('Error updating order')
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.allOrders.gen() })
      await queryClient.invalidateQueries({ queryKey: queryKeys.orderDetails.gen(order.id) })
    },
  })

  const { mutate: confirmShipment } = useMutation({
    mutationFn: (data: Partial<IShipmentUpdateRequest>) =>
      shipmentApi.updateShipment(data, order.shipment?.id || ''),
    onSuccess: () => {
      toast.success('Confirm shipment successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.allOrders.gen() })
      await queryClient.invalidateQueries({ queryKey: queryKeys.orderDetails.gen(order.id) })
    },
  })

  const handleConfirm = () => {
    const updateData: Partial<IOrderUpdateRequest> = {
      confirmed_employee_id: profile.data?.id || order.confirming_employee_id,
      status: ORDER_STATUS.DELIVERED,
    }
    editOrder(updateData)
  }

  const handleCancel = () => {
    const updateData: Partial<IOrderUpdateRequest> = {
      status: ORDER_STATUS.CANCELLED,
      confirmed_employee_id: profile.data?.id || order.confirming_employee_id,
    }
    editOrder(updateData)
  }

  const handlePrint = () => {
    if (printRef.current) {
      const divElement = document.createElement('div')
      divElement.classList.add('printContainer')
      divElement.innerHTML = printRef.current.innerHTML
      document.body.appendChild(divElement).classList.add('printingContent')
      window.print()
      divElement.remove()
      document.body.classList.remove('printingContent')
    }
  }

  const handleShipment = () => {
    const updateData: Partial<IShipmentUpdateRequest> = {
      order_id: order.id,
      address_id: order.shipment?.shipping_address || '',
      shipped: true,
      shipped_date: moment().toDate(),
      completed_date: moment().toDate(),
      shipment_tracking: 'Da giao hang',
    }
    confirmShipment(updateData)
  }

  return (
    <div className='flex w-full flex-row items-center justify-between px-[20px] py-[10px]'>
      <div className='flex flex-col space-y-[5px]'>
        <span className='font-semibold'>Order {order.order_code}</span>
        <div className='flex flex-row space-x-[5px]'>
          {order.status === ORDER_STATUS.PENDING ? (
            <Button onClick={handleConfirm}>Confirm</Button>
          ) : order.status === ORDER_STATUS.CANCELLED ? (
            <CancelledLabel />
          ) : (
            <ConfirmLabel />
          )}
        </div>
      </div>
      <div className='flex flex-row space-x-[5px]'>
        {order.status === ORDER_STATUS.DELIVERED && (
          <Button
            onClick={handlePrint}
            className='flex gap-[5px] rounded-[5px] bg-[#D4E0FF] px-2 py-1 duration-300 hover:bg-[#dde6fa]'
          >
            <Printer color='#336AEA' width={22} height={22} />
          </Button>
        )}
        {order.status === ORDER_STATUS.PENDING && <Button onClick={handleCancel}>Cancel</Button>}
        {order.status !== ORDER_STATUS.CANCELLED && !!order.shipment?.completed_date && (
          <Button onClick={handleShipment}>Confirm Shipment</Button>
        )}
      </div>
      {order.shipment &&
        createPortal(
          <div className='hidden' ref={printRef}>
            <Invoice order={order} />
          </div>,
          document.body,
        )}
    </div>
  )
}

export default ActionBar
