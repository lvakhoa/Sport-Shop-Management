import { Button, ComboBox } from '@/components/shared'
import {
  CancelledLabel,
  DeliveredLabel,
  InTransitLabel,
  PackagingLabel,
  PendingLabel,
  ReturnedLabel,
  UndeliveredLabel,
} from './ShipmentStatusLabel'
import { IOrder, IOrderByIdResponse, IOrderUpdateRequest } from '@/interfaces/order'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { orderApi, shipmentApi } from '@/apis'
import { toast } from 'react-toastify'
import { queryKeys } from '@/configs'
import { useProfile } from '@/hooks'
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Invoice from './Invoice'
import { ORDER_STATUS, orderStatusMapping } from '@/configs/enum'
import { LoaderCircle, Printer } from 'lucide-react'
import { IShipmentUpdateRequest } from '@/interfaces/shipment'
import moment from 'moment'

function StatusLabel({ status }: { status: ORDER_STATUS }) {
  switch (status) {
    case ORDER_STATUS.DELIVERED:
      return <DeliveredLabel />
    case ORDER_STATUS.CANCELLED:
      return <CancelledLabel />
    case ORDER_STATUS.UNDELIVERED:
      return <UndeliveredLabel />
    case ORDER_STATUS.IN_TRANSIT:
      return <InTransitLabel />
    case ORDER_STATUS.RETURNED:
      return <ReturnedLabel />
    case ORDER_STATUS.PACKAGING:
      return <PackagingLabel />
    default:
      return <PendingLabel />
  }
}

function ActionBar({ order }: { order: IOrderByIdResponse }) {
  const profile = useProfile()
  const queryClient = useQueryClient()

  const printRef = useRef<HTMLDivElement>(null)

  const { mutate: editOrder, isPending: editLoading } = useMutation({
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

  const [status, setStatus] = useState(order.status)

  const handleSave = () => {
    const updateData: Partial<IOrderUpdateRequest> = {
      status,
    }
    editOrder(updateData)
  }

  return (
    <div className='flex w-full flex-row items-center justify-between px-[20px] py-[10px]'>
      <div className='flex flex-col space-y-[5px]'>
        <span className='font-semibold'>Order {order.order_code}</span>
        <div className='flex flex-row space-x-[5px]'>
          <StatusLabel status={order.status} />
        </div>
      </div>
      <div className='flex flex-row space-x-[5px]'>
        <ComboBox
          className='w-[150px]'
          placeholder={orderStatusMapping[order.status]}
          items={Object.values(ORDER_STATUS).map(([key, value]) => ({
            value: key,
            label: value,
          }))}
          onValueChange={(value) => {
            setStatus(value as ORDER_STATUS)
            console.log(status)
          }}
        />
        <Button onClick={handleSave} variant='outline' disabled={editLoading}>
          {editLoading && <LoaderCircle className='animate-spin' size={20} />}
          Save
        </Button>
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
