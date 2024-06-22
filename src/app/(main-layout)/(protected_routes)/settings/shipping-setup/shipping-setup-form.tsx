'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/shared/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/shared/form'
import { Input } from '@/components/shared/input'
import { toast } from 'react-toastify'
import { useMutation, useQuery } from '@tanstack/react-query'
import { shippingPriceApi } from '@/apis'
import { queryKeys } from '@/configs'
import { IShippingPriceRequest, IShippingPriceResponse } from '@/interfaces/shipping-price'
import { RadioGroup, RadioGroupItem } from '@/components/shared/radio-group'

const shippingFormSchema = z.object({
  id: z.string(),
  price: z.string({ required_error: 'Price is required' }),
})

type ShippingFormValues = z.infer<typeof shippingFormSchema>

export function ShippingForm() {
  const { data: shippingPriceData } = useQuery({
    queryKey: queryKeys.shippingPrices.gen(),
    queryFn: () => shippingPriceApi.getAllShippingPrice(),
  })

  const shippingPrices: IShippingPriceResponse[] =
    shippingPriceData?.map((item) => ({
      id: item.id,
      type: item.type,
      price: item.price,
    })) || []

  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingFormSchema),
  })
  const shippingId = form.watch('id')

  const { mutate: updatePrice } = useMutation({
    mutationFn: (data: IShippingPriceRequest) =>
      shippingPriceApi.updateShippingPrice(
        {
          price: data.price,
        },
        shippingId,
      ),
    onSuccess: () => {
      toast.success('Shipping price updated')
    },
    onError: () => {
      toast.error('Error updating shipping price')
    },
  })

  function onSubmit(data: ShippingFormValues) {
    updatePrice({
      price: parseInt(data.price),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid grid-cols-2 gap-[15px] pb-[15px] max-[1024px]:grid-cols-1'>
          <FormField
            control={form.control}
            name='id'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shipping Type</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} className='flex flex-col space-y-1'>
                    {shippingPrices?.map((item, index) => (
                      <FormItem key={index} className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value={item.id} />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          {item.type
                            .split('_')
                            .map(
                              (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
                            )
                            .join(' ')}{' '}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder={shippingPrices.find((item) => item.id === shippingId)?.price}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type='submit'>Update Shipping Price</Button>
      </form>
    </Form>
  )
}
