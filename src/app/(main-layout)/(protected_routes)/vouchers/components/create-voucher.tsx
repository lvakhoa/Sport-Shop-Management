import { categoryApi, productApi, voucherApi } from '@/apis'
import { queryKeys } from '@/configs'
import { IProductRequest } from '@/interfaces/product'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/shared/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Checkbox,
  ComboBox,
  DatePicker,
  Input,
  Label,
  ScrollArea,
  Separator,
} from '@/components/shared'
import { STATUS } from '@/configs/enum'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shared/popover'
import { IVoucherRequest } from '@/interfaces/voucher'
import moment from 'moment'

const voucherSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required',
  }),
  code: z.string().min(1, {
    message: 'Code is required',
  }),
  sale_percent: z.string().refine(
    (value) => {
      const numberValue = parseFloat(value)
      return !isNaN(numberValue) && numberValue >= 0 && numberValue <= 1
    },
    {
      message: 'Sale percent must be between 0 and 1',
    },
  ),
  quantity: z.string().refine(
    (value) => {
      const numberValue = parseFloat(value)
      return !isNaN(numberValue) && numberValue >= 0
    },
    {
      message: 'Quantity is a number greater than or equal to 0',
    },
  ),
  expired_date: z.string().refine((date) => new Date(date) >= new Date(), {
    message: 'Expired date must be in the future',
  }),
})

export default function CreateVoucherForm() {
  const queryClient = useQueryClient()

  const { mutate: createVoucher } = useMutation({
    mutationFn: (data: IVoucherRequest) =>
      voucherApi.createVoucher({
        title: data.title,
        code: data.code,
        sale_percent: data.sale_percent,
        quantity: data.quantity,
        expired_date: data.expired_date,
      }),
    onSuccess: () => {
      toast.success('Voucher created successfully')
    },
    onError: () => {
      toast.error('Error creating voucher')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'vouchers' })
    },
  })

  const form = useForm<z.infer<typeof voucherSchema>>({
    resolver: zodResolver(voucherSchema),
    defaultValues: {
      title: '',
      code: '',
      sale_percent: '',
      quantity: '',
      expired_date: moment().toISOString(),
    },
  })

  function onSubmit(data: z.infer<typeof voucherSchema>) {
    createVoucher({
      title: data.title,
      code: data.code,
      sale_percent: parseFloat(data.sale_percent),
      quantity: parseInt(data.quantity),
      expired_date: moment(data.expired_date).toDate(),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4 py-4'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='title' className='text-left'>
                    Title
                  </Label>
                  <Input id='title' className='col-span-3' {...field} />
                </div>
              </FormControl>
              <FormMessage className='text-[14px] font-normal' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='code'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='code' className='text-left'>
                    Code
                  </Label>
                  <Input id='code' className='col-span-3' {...field} />
                </div>
              </FormControl>
              <FormMessage className='text-[14px] font-normal' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='sale_percent'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='sale_percent' className='text-left'>
                    Sale percent
                  </Label>
                  <Input id='sale_percent' className='col-span-3' {...field} />
                </div>
              </FormControl>
              <FormMessage className='text-[14px] font-normal' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='quantity'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='quantity' className='text-left'>
                    Quantity
                  </Label>
                  <Input id='quantity' className='col-span-3' {...field} />
                </div>
              </FormControl>
              <FormMessage className='text-[14px] font-normal' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='expired_date'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='expired_date' className='text-left'>
                    Expired Date
                  </Label>
                  <div className='col-span-3'>
                    <DatePicker
                      date={field.value}
                      selectDate={(val) => {
                        field.onChange(val?.toISOString() ?? moment().toISOString())
                      }}
                    />
                  </div>
                </div>
              </FormControl>
              <FormMessage className='text-[14px] font-normal' />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          className='flex gap-[5px] bg-secondary duration-300 hover:bg-[#739AF4]'
        >
          Add Voucher
        </Button>
      </form>
    </Form>
  )
}
