import { customerApi } from '@/apis'
import { queryKeys } from '@/configs'
import { currencyFormatter } from '@/helpers'
import { IOrderResponse, IOrderStockResponse } from '@/interfaces/order'
import { IStockResponse } from '@/interfaces/stock'
import { useQueries, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import moment from 'moment'

function OrderDetails({ order }: { order: IOrderResponse }) {
  return (
    <div className='space-y-[15px] px-[10px]'>
      {/* <div>
        <span className='px-[10px] py-[15px]'>Seller: Kien</span>
      </div> */}
      <div className='space-y-[5px] overflow-hidden px-[10px]'>
        {order.order_details.map((item) => (
          <Item key={item.stock.id} stock={item.stock} quantity={item.quantity} />
        ))}
      </div>
    </div>
  )
}

function ShipmentInfo({ order }: { order: IOrderResponse }) {
  const { data: customerData } = useQuery({
    queryKey: queryKeys.customerDetails.gen(order.account_id),
    queryFn: () => customerApi.getCustomerById(order.customer_id),
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
          {order.shipment !== null && (
            <span>
              {order.shipment.address?.street}, {order.shipment.address?.ward},{' '}
              {order.shipment.address?.district}, {order.shipment.address?.city}
            </span>
          )}
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
                : ''}
            </span>
          )}
        </div>
      </div>
      <div className='flex flex-row items-start space-x-[10px] bg-[#E6E7EA] px-[10px] py-[5px]'>
        <Image src='assets/icons/note.svg' alt='' width={20} height={20} />
        <span className='text-[#797979]'>{order.note}</span>
      </div>
      <div className='flex w-full flex-col space-y-[10px] px-[10px]'>
        <div className='flex w-full flex-row justify-between'>
          <div className='flex flex-row space-x-[5px]'>
            <span>Total</span>
            <div className='rounded-[2px] bg-[#E6E7EA] px-[5px]'>
              <span className='text-[#797979]'>{order.order_details.length} item</span>
            </div>
          </div>
          <span>{currencyFormatter(BigInt(order.product_total_price))}</span>
        </div>
        <div className='flex w-full flex-row justify-between'>
          <span>Shipping Fee</span>
          <span>{currencyFormatter(BigInt(order.shipment?.shipping_price || '0'))}</span>
        </div>
        <div className='flex w-full flex-row justify-between'>
          <span>Discount</span>
          <span>
            {(order.voucher &&
              currencyFormatter(
                BigInt(parseFloat(order.product_total_price) * order.voucher?.sale_percent),
              )) ||
              currencyFormatter(0)}
          </span>
        </div>
        <div className='flex w-full flex-row justify-between'>
          <span>Customer Paid</span>
          <span>
            {currencyFormatter(
              parseFloat(order.product_total_price) +
                parseFloat(order.shipment?.shipping_price || '0') +
                parseFloat(order.product_total_price) * 0.05,
            )}
          </span>
        </div>
        <div className='flex w-full flex-row justify-between'>
          <span className='font-semibold'>Sub Total</span>
          <span className='font-semibold'>
            {currencyFormatter(
              parseFloat(order.product_total_price) +
                parseFloat(order.shipment?.shipping_price || '0') +
                parseFloat(order.product_total_price) * 0.05 -
                (order.voucher
                  ? parseFloat(order.product_total_price) * order.voucher.sale_percent
                  : 0),
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

function Item({ stock, quantity }: { stock: IOrderStockResponse; quantity: number }) {
  return (
    <div className='flex h-[100px] w-full flex-row items-center space-x-[20px] rounded-[5px] border border-[#E6E7EA] px-[15px] py-[10px]'>
      <div className='relative size-[70px] items-center justify-center rounded-[5px] border border-[#E6E7EA]'>
        <Image src={stock.media?.url || 'assets/images/logo.png'} alt='' objectFit='cover' fill />
      </div>
      <div className='flex w-full flex-col'>
        <div>
          <span className='font-semibold'>{stock.product.name}</span>
        </div>
        <div>
          <span className='text-[14px] text-[#797979]'>
            {stock.size} |{' '}
            {stock.color && stock.color?.name.charAt(0).toUpperCase() + stock.color?.name.slice(1)}{' '}
            | {currencyFormatter(parseFloat(stock.product.selling_price))}
          </span>
        </div>
        <div className='flex w-full gap-3'>
          <span>x{quantity.toString()}</span>
          <span>{currencyFormatter(parseFloat(stock.product.selling_price) * quantity)}</span>
        </div>
      </div>
    </div>
  )
}

export { OrderDetails, Item, ShipmentInfo }
