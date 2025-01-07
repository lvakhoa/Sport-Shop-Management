import { customerApi } from '@/apis'
import { queryKeys } from '@/configs'
import { currencyFormatter } from '@/helpers'
import { IOrder, IOrderByIdResponse } from '@/interfaces/order'
import { IStock } from '@/interfaces/stock'
import { useQueries, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import moment from 'moment'
import { StickyNote } from 'lucide-react'

function OrderDetails({ order }: { order: IOrderByIdResponse }) {
  return (
    <div className='space-y-[15px] px-[10px]'>
      {/* <div>
        <span className='px-[10px] py-[15px]'>Seller: Kien</span>
      </div> */}
      <div className='space-y-[5px] overflow-hidden px-[10px]'>
        {order.order_details.map((item) => (
          <Item
            key={item.stock.id}
            stock={{
              ...item.stock,
              name: item.stock.product.name,
              quantity: item.quantity,
              total: order.order_details.length,
              product: {
                ...item.stock.product,
                list_price: '',
              },
            }}
            quantity={item.quantity}
          />
        ))}
      </div>
    </div>
  )
}

function ShipmentInfo({ order }: { order: IOrderByIdResponse }) {
  const { data: customerData } = useQuery({
    queryKey: queryKeys.customerDetails.gen(order.customer.id),
    queryFn: () => customerApi.getCustomerById(order.customer.id),
  })
  return (
    <div className='flex flex-col space-y-[10px]'>
      <div className='flex flex-col space-y-[10px] px-[10px]'>
        <div className='flex flex-row space-x-[60px]'>
          <span className='w-[50px] text-[#797979]'>Customer</span>
          <span>{customerData?.fullname}</span>
        </div>
        <div className='flex flex-row space-x-[60px]'>
          <span className='w-[50px] text-[#797979]'>Phone</span>
          <span>{customerData?.phone}</span>
        </div>
        <div className='flex flex-row space-x-[60px]'>
          <span className='w-[50px] text-[#797979]'>Shipping Address</span>
          {order.shipment !== null && <span>{order.shipment?.shipping_address}</span>}
        </div>
        <div className='flex flex-row space-x-[60px]'>
          <span className='w-[50px] text-[#797979]'>Order</span>
          <span>{moment(order.order_date).format('YYYY-MM-DD HH:mm:ss')}</span>
        </div>
        <div className='flex flex-row space-x-[60px]'>
          <span className='w-[50px] text-[#797979]'>Delivered Date</span>
          {order.shipment != null && (
            <span>
              {order.shipment.shipped_date
                ? moment(order.shipment.shipped_date).format('YYYY-MM-DD HH:mm:ss')
                : 'Awaiting confirmation'}
            </span>
          )}
        </div>
      </div>
      <div className='flex w-full flex-col space-y-[10px] px-[10px]'>
        <div className='flex w-full flex-row justify-between'>
          <div className='flex flex-row space-x-[5px]'>
            <span>Total</span>
          </div>
          <span>{currencyFormatter(BigInt(order.product_total_price))}</span>
        </div>
        {/* <div className='flex w-full flex-row justify-between'>
          <span>Shipping Fee</span>
          <span>{currencyFormatter(BigInt(order.shipment?. || '0'))}</span>
        </div> */}
        <div className='flex w-full flex-row justify-between'>
          <span>Discount</span>
          <span>
            {(order.voucher &&
              currencyFormatter(
                BigInt(order.product_total_price * order.voucher?.voucher_value),
              )) ||
              currencyFormatter(0)}
          </span>
        </div>
        <div className='flex w-full flex-row justify-between'>
          <span>Customer Paid</span>
          <span>
            {currencyFormatter(
              order.product_total_price * (order.voucher ? order.voucher.voucher_value : 0),
            )}
          </span>
        </div>
        <div className='flex w-full flex-row justify-between'>
          <span className='font-semibold'>Sub Total</span>
          <span className='font-semibold'>
            {currencyFormatter(
              order.product_total_price * (order.voucher ? order.voucher.voucher_value : 0),
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

function Item({ stock, quantity }: { stock: IStock; quantity: number }) {
  return (
    <div className='flex h-[100px] w-full flex-row items-center space-x-[20px] rounded-[5px] border border-[#E6E7EA] px-[15px] py-[10px]'>
      {/* <div className='relative size-[70px] items-center justify-center rounded-[5px] border border-[#E6E7EA]'>
        <Image src={'assets/images/logo.png'} alt='' width={100} height={100} />
      </div> */}
      <div className='flex w-full flex-col'>
        <div>
          <span className='font-semibold'>{stock.product.name}</span>
        </div>
        {/* <div>
          <span className='text-[14px] text-[#797979]'>
            {stock.size} |{' '}
            {stock.color && stock.color?.name.charAt(0).toUpperCase() + stock.color?.name.slice(1)}{' '}
            | {currencyFormatter(parseFloat(stock.product.selling_price))}
          </span>
        </div>
        <div className='flex w-full gap-3'>
          <span>x{quantity.toString()}</span>
          <span>{currencyFormatter(parseFloat(stock.product.selling_price) * quantity)}</span>
        </div> */}
      </div>
    </div>
  )
}

export { OrderDetails, Item, ShipmentInfo }
