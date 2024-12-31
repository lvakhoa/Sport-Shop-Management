'use client'

import { IOrder } from '@/interfaces/order'
import moment from 'moment'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { customerApi } from '@/apis'
import { currencyFormatter } from '@/helpers'

function Invoice({ order }: { order: IOrder }) {
  const { data: customerData } = useQuery({
    queryKey: queryKeys.customerDetails.gen(order.customer_id),
    queryFn: () => customerApi.getCustomerById(order.customer_id),
  })
  return (
    <div className='flex flex-col space-y-[10px]'>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-col space-y-[5px]'>
          <span className='text-[25px] font-bold'>INVOICE</span>
          <span className='text-[20px] font-semibold'>Clothy</span>
          <span>10 Khanh Hoi, Ward 3, District 4, HCM City</span>
          <span>0911000222</span>
          <span>support@clothy.com</span>
        </div>
        <Image alt='logo' src='/assets/images/logo.png' width={100} height={50} />
      </div>
      <hr />
      <div className='flex w-full justify-around'>
        <span className='text-start font-bold'>ORDER NO: {order.order_code}</span>
        <span className='text-start font-bold'>
          INVOICE DATE: {moment(new Date()).format('DD-MM-YYYY HH:mm:ss')}
        </span>
      </div>
      <hr />
      <div className='flex flex-col space-y-[5px]'>
        <span className='text-[20px] font-bold'>BILL TO</span>
        <span>Customer Name: {customerData?.fullname}</span>
        <span>Phone Number: {customerData?.phone}</span>
        <span>Address: {order.shipment?.shipping_address}</span>
      </div>
      <hr />
      <table>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Product</th>
            <th scope='col'>Quantity</th>
            <th scope='col'>Unit Price</th>
            <th scope='col'>Amount</th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {order.ordered_products.map((order, index) => (
            <tr key={order.stock.id}>
              <td className='p-[5px] text-center'>{index + 1}</td>
              <td className='p-[5px] text-center'>{order.stock.product.name}</td>
              <td className='p-[5px] text-center'>{order.quantity}</td>
              <td className='p-[5px] text-center'>
                {currencyFormatter(BigInt(order.stock.product.selling_price))}
              </td>
              <td className='p-[5px] text-center'>
                {currencyFormatter(order.stock.product.selling_price * order.quantity)}
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={4} className='py-3 pr-6 text-center font-bold uppercase text-gray-500'>
              Subtotal
            </td>
            <td className='px-6 py-3 text-center font-medium text-gray-900'>
              {currencyFormatter(BigInt(order.product_total_price))}
            </td>
          </tr>
        </tbody>
      </table>
      <hr className='py-[40px]' />
      <span className='w-full text-center italic'>Thank you for choosing us!</span>
    </div>
  )
}

export default Invoice
