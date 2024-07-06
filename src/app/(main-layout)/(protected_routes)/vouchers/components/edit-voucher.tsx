'use client'

import { voucherApi } from '@/apis'
import { queryKeys } from '@/configs'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/shared/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DatePicker } from '@/components/shared'
import { Button, Input, Label } from '@/components/shared'
import { IVoucherRequest } from '@/interfaces/voucher'
import moment from 'moment'

const voucherSchema = z
  .object({
    title: z.string(),
    code: z.string(),
    sale_percent: z.string(),
    quantity: z.string(),
    expired_date: z.string(),
  })
  .partial()

export default function EditVoucherForm({ voucherId }: { voucherId: string }) {
  const queryClient = useQueryClient()

  const { data: voucher } = useQuery({
    queryKey: queryKeys.voucherDetails.gen(voucherId),
    queryFn: () => voucherApi.getVoucherById(voucherId),
  })

  const { mutate: editVoucher } = useMutation({
    mutationFn: (data: IVoucherRequest) =>
      voucherApi.updateVoucher(
        {
          title: data.title,
          code: data.code,
          sale_percent: data.sale_percent,
          quantity: data.quantity,
          expired_date: data.expired_date,
        },
        voucherId,
      ),
    onSuccess: () => {
      toast.success('Voucher updated successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'vouchers',
      })
      await queryClient.invalidateQueries({ queryKey: queryKeys.voucherDetails.gen(voucherId) })
    },
  })

  const form = useForm<z.infer<typeof voucherSchema>>({
    resolver: zodResolver(voucherSchema),
  })

  function onSubmit(data: z.infer<typeof voucherSchema>) {
    editVoucher({
      title: data.title,
      code: data.code,
      sale_percent: parseFloat(data.sale_percent ?? '0'),
      quantity: parseFloat(data.quantity ?? '0'),
      expired_date: moment(data.expired_date).toDate(),
    })
  }

  useEffect(() => {
    if (!!voucher) {
      form.setValue('title', voucher.title ?? '')
      form.setValue('sale_percent', voucher.sale_percent.toString())
      form.setValue('quantity', voucher.quantity.toString())
      form.setValue('expired_date', moment(voucher.expired_date).toString())
    }
  }, [voucher, form])

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
              <FormMessage className='text-[16px] font-normal' />
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
                  <Input id='code' placeholder={voucher?.code} className='col-span-3' {...field} />
                </div>
              </FormControl>
              <FormMessage className='text-[16px] font-normal' />
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
              <FormMessage className='text-[16px] font-normal' />
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
              <FormMessage className='text-[16px] font-normal' />
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
                      date={moment(field.value).toDate()}
                      selectDate={(val) => {
                        field.onChange(moment(val).toString())
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
          Edit Voucher
        </Button>
      </form>
    </Form>
  )
}
