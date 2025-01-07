'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useOrderStore } from '@/stores'
import { useMutation, useQuery } from '@tanstack/react-query'
import { PATH_NAME, queryKeys } from '@/configs'
import { addressApi, customerApi, shippingPriceApi, orderApi } from '@/apis'
import Image from 'next/image'
import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
} from '@/components/shared/form'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from '@/components/shared/select'
import { Card } from '@/components/shared/card'
import { RadioGroup, RadioGroupItem } from '@/components/shared/radio-group'
import { Textarea } from '@/components/shared/text-area'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/shared'
import { ICustomer } from '@/interfaces/customer'
import { toast } from 'react-toastify'
import { IOrderCreateRequest } from '@/interfaces/order'
import { ORDER_STATUS, PAYMENT_TYPE } from '@/configs/enum'

const orderDetailSchema = z.object({
  stock_id: z.string(),
  quantity: z.number(),
})

const formSchema = z.object({
  customer_id: z.string(),
  product_total_price: z.number({ required_error: 'Missing total price' }),
  order_details: z.array(orderDetailSchema),
  address_id: z.string().optional(),
  shipping_price: z.string().optional(),
  payment_type: z.enum(['CASH', 'BANK'], {
    required_error: 'Please select a payment method',
  }),
  voucher_id: z.string().optional(),
})

export default function OrderPage() {
  const router = useRouter()
  const orderDetail = useOrderStore((state) => state.orderDetail)
  const total = useOrderStore((state) => state.totalPrice)

  const [currentCustomer, setCurrentCustomer] = useState<ICustomer | null>(null)

  const { data: customersData } = useQuery({
    queryKey: queryKeys.customers.gen(),
    queryFn: () => customerApi.getAllCustomers(),
  })

  const { data: addressesData } = useQuery({
    queryKey: queryKeys.addresses.gen(),
    queryFn: () => addressApi.getAllAddress(),
  })

  const { data: shippingPriceData } = useQuery({
    queryKey: queryKeys.shippingPrices.gen(),
    queryFn: () => shippingPriceApi.getAllShippingPrice(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer_id: undefined,
      product_total_price: total,
      order_details: orderDetail?.map((order) => ({
        product_stock_id: order.stock_id,
        quantity: order.quantity,
      })),
      address_id: undefined,
      shipping_price: undefined,
      voucher_id: undefined,
    },
  })
  const shippingPrice = form.watch('shipping_price')

  const { mutate: createOrder } = useMutation({
    mutationFn: (data: IOrderCreateRequest) =>
      orderApi.createOrder({
        customer_id: data.customer_id,
        product_total_price: data.product_total_price,
        order_details: data.order_details,
        payment_type: data.payment_type,
        shipment: {
          shipping_address: data.shipment.shipping_address,
          shipping_fee: data.shipment.shipping_fee,
        },
      }),
    onSuccess: (response) => {
      toast.success('Order created successfully')
      if (!!response?.order_id) {
        router.push(`${PATH_NAME.ORDER_DETAILS}/${response.order_id}`)
      }
    },
    onError: () => {
      toast.error('Error creating order')
    },
  })

  function handleSubmit(data: z.infer<typeof formSchema>) {
    createOrder({
      product_total_price: data.product_total_price,
      order_details: data.order_details,
      payment_type: PAYMENT_TYPE[data.payment_type],
      customer_id: '',
      shipment: {
        shipping_fee: 0,
        shipping_address: '',
      },
    })
  }

  return (
    <div className='flex w-full'>
      <div className='flex w-1/2 flex-col p-[10px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-[20px]'>
            <FormField
              control={form.control}
              name='customer_id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className='text-red-500'>*</span> Customer
                  </FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      setCurrentCustomer(
                        customersData?.find((customer) => customer.id === value) || null,
                      )
                      field.onChange(value)
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Customer' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {customersData?.map((customer, index) => (
                          <SelectItem key={customer.id} value={customer.id}>
                            {customer.fullname}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            ></FormField>

            {/* <FormField
              control={form.control}
              name='address_id'
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Shipping Address' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {addressesData ? (
                          addressesData.filter(
                            (address) => address.account_id === currentCustomer?.account_id,
                          ).length > 0 ? (
                            addressesData
                              .filter(
                                (address) => address.account_id === currentCustomer?.account_id,
                              )
                              .map((address, index) => (
                                <SelectItem key={index} value={address.id}>
                                  {address.street}, {address.city}, {address.district},{' '}
                                  {address.ward}
                                </SelectItem>
                              ))
                          ) : (
                            <SelectLabel>No addresses found</SelectLabel>
                          )
                        ) : null}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            ></FormField> */}

            <FormField
              control={form.control}
              name='shipping_price'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  <FormLabel>
                    <span className='text-red-500'>*</span> Shipping Method
                  </FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} className='flex flex-col space-y-1'>
                      {shippingPriceData?.map((shippingPrice, index) => (
                        <FormItem key={index} className='flex items-center space-x-3 space-y-0'>
                          <FormControl>
                            <RadioGroupItem value={shippingPrice.price} />
                          </FormControl>
                          <FormLabel className='font-normal'>
                            {shippingPrice.type
                              .split('_')
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
                              )
                              .join(' ')}{' '}
                            - {shippingPrice.price}đ
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <FormField
              control={form.control}
              name='payment_type'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  <FormLabel>
                    <span className='text-red-500'>*</span> Payment Method
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-col space-y-1'
                    >
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='CASH' />
                        </FormControl>
                        <FormLabel className='font-normal'>Cash</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='BANK' />
                        </FormControl>
                        <FormLabel className='font-normal'>Bank</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            <Button
              type='submit'
              className='w-full'
              disabled={Object.entries(form.formState.errors).some(
                ([_, value]) => value !== undefined,
              )}
            >
              Place Order
            </Button>
          </form>
        </Form>
      </div>
      <div className='mx-2 w-px bg-gray-300'></div>
      <div className='flex w-1/2 flex-col'>
        {(!orderDetail || orderDetail.length === 0) && (
          <div className='flex h-full flex-col items-center justify-center gap-3'>
            <span className='text-lg font-semibold'>No product selected</span>
            <Button onClick={() => router.push('/pos')}>Go to POS</Button>
          </div>
        )}
        {orderDetail?.map((product, index) => (
          <Card className='rounded-none' key={index}>
            <div className='flex flex-row gap-3 p-[15px]'>
              <Image
                className='rounded-lg'
                src={
                  product.image ??
                  'https://res.cloudinary.com/dbpvh14wj/image/upload/f_auto,q_auto/pzi7bjxajmsgraesmjt2'
                }
                alt={''}
                width={70}
                height={70}
              />
              <div className='flex grow flex-col justify-between'>
                <div className='flex flex-col'>
                  <span className='text-[20px] font-semibold text-gray-500'>{product.name}</span>
                  <div className='flex items-center gap-2'>
                    <div className='size-4' style={{ background: product.color }}></div>
                    <span className='text-xl font-light'>|</span>
                    <span className='text-[14px] font-light'>{product.size}</span>
                  </div>
                </div>
                <div className='flex flex-row justify-between'>
                  <span className='text-[16px] font-semibold'>{product.price} đ</span>
                  <span>x {product.quantity}</span>
                  <span className='text-[16px] font-semibold'>
                    {product.price * product.quantity!} đ
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
        <div className='my-[20px] w-full border-t border-gray-300'></div>{' '}
        {orderDetail && orderDetail?.length > 0 && (
          <div className='w-full px-[15px]'>
            <div className='flex flex-col gap-[10px]'>
              {shippingPrice && (
                <div className='flex flex-row justify-between'>
                  <span>Shipping:</span>
                  <span>{shippingPrice} đ</span>
                </div>
              )}
              <div className='flex flex-row justify-between'>
                <span>Total:</span>
                <span>{shippingPrice ? total + parseInt(shippingPrice) : total} đ</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
