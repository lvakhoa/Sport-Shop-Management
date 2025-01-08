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
import { ComboBox, DatePicker } from '@/components/shared'
import { Button, Input, Label } from '@/components/shared'
import { IVoucherRequest } from '@/interfaces/voucher'
import moment from 'moment'
import {
  VOUCHER_APPLICABLE_TYPE,
  VOUCHER_TYPE,
  voucherApplicableTypeMapping,
  voucherTypeMapping,
} from '@/configs/enum'

const voucherSchema = z
  .object({
    group_voucher_id: z.string(),
    campaign_name: z.string(),
    title: z.string(),
    description: z.string(),
    voucher_type: z.nativeEnum(VOUCHER_TYPE, {
      invalid_type_error: 'Invalid voucher type',
    }),
    voucher_value: z.number().refine(
      (value) => {
        return value >= 0 && value <= 1
      },
      {
        message: 'Voucher value must be between 0 and 1',
      },
    ),
    code: z.string(),
    starting_date: z.string().datetime(),
    ending_date: z.string().datetime(),
    total_quantity: z.number().gt(0, {
      message: 'Total quantity is a number greater than or equal to 0',
    }),
    quantity_per_user: z.number().gt(0, {
      message: 'Quantity per user is a number greater than or equal to 0',
    }),
    minimum_price: z.number().gt(0, {
      message: 'Minimum price is a number greater than or equal to 0',
    }),
    applicable_type: z.nativeEnum(VOUCHER_APPLICABLE_TYPE, {
      invalid_type_error: 'Invalid applicable type',
    }),
    is_active: z.boolean(),
  })
  .partial()

export default function EditVoucherForm({ voucherId }: { voucherId: string }) {
  const queryClient = useQueryClient()

  const { data: voucher } = useQuery({
    queryKey: queryKeys.voucherDetails.gen(voucherId),
    queryFn: () => voucherApi.getVoucherById(voucherId),
  })

  const { data: groupVouchers } = useQuery({
    queryKey: ['groupVouchers'],
    queryFn: () => voucherApi.getAllGroupVouchers(),
  })

  const { mutate: editVoucher } = useMutation({
    mutationFn: (data: Partial<IVoucherRequest>) =>
      voucherApi.updateVoucher(
        {
          title: data.title,
          code: data.code,
          group_voucher_id: data.group_voucher_id,
          campaign_name: data.campaign_name,
          voucher_type: data.voucher_type,
          voucher_value: data.voucher_value,
          starting_date: data.starting_date,
          ending_date: data.ending_date,
          total_quantity: data.total_quantity,
          quantity_per_user: data.quantity_per_user,
          minimum_price: data.minimum_price,
          applicable_type: data.applicable_type,
          is_active: data.is_active,
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
      group_voucher_id: data.group_voucher_id,
      campaign_name: data.campaign_name,
      voucher_type: data.voucher_type,
      voucher_value: data.voucher_value,
      starting_date: data.starting_date,
      ending_date: data.ending_date,
      total_quantity: data.total_quantity,
      quantity_per_user: data.quantity_per_user,
      minimum_price: data.minimum_price,
      applicable_type: data.applicable_type,
      is_active: data.is_active,
    })
  }

  // useEffect(() => {
  //   if (!!voucher) {
  //     form.setValue('title', voucher.title ?? '')
  //     form.setValue('sale_percent', voucher.voucher_value.toString())
  //     form.setValue('quantity', voucher.total_quantity.toString())
  //     form.setValue('expired_date', moment(voucher.ending_date).toString())
  //   }
  // }, [voucher, form])

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
                  <Input
                    id='title'
                    className='col-span-3'
                    placeholder={voucher?.title}
                    {...field}
                  />
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
                  <Input id='code' className='col-span-3' placeholder={voucher?.code} {...field} />
                </div>
              </FormControl>
              <FormMessage className='text-[14px] font-normal' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='group_voucher_id'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='group_voucher_id' className='text-left'>
                    Brand
                  </Label>
                  <div className='col-span-3'>
                    <ComboBox
                      key='group_voucher_id'
                      placeholder={voucher?.group_voucher.name ?? 'Select group voucher'}
                      defaultValue={voucher?.group_voucher.id}
                      items={groupVouchers?.map((b) => ({ value: b.id, label: b.name })) ?? []}
                      onValueChange={field.onChange}
                    />
                  </div>
                </div>
              </FormControl>
              <FormMessage className='text-[14px] font-normal' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='campaign_name'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='campaign_name' className='text-left'>
                    Campaign Name
                  </Label>
                  <Input id='campaign_name' className='col-span-3' {...field} />
                </div>
              </FormControl>
              <FormMessage className='text-[14px] font-normal' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='voucher_type'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='voucher_type' className='text-left'>
                    Voucher Type
                  </Label>
                  <ComboBox
                    key='voucher_type'
                    placeholder='Select voucher type'
                    items={Object.values(VOUCHER_TYPE).map((type) => ({
                      value: type,
                      label: voucherTypeMapping[type],
                    }))}
                    onValueChange={field.onChange}
                  />
                </div>
              </FormControl>
              <FormMessage className='text-[14px] font-normal' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='voucher_value'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='voucher_value' className='text-left'>
                    Voucher Value
                  </Label>
                  <Input id='voucher_value' type='number' className='col-span-3' {...field} />
                </div>
              </FormControl>
              <FormMessage className='text-[14px] font-normal' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='starting_date'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='starting_date' className='text-left'>
                    Starting Date
                  </Label>
                  <div className='col-span-3'>
                    <DatePicker
                      date={moment(field.value).toDate()}
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

        <FormField
          control={form.control}
          name='ending_date'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='ending_date' className='text-left'>
                    Ending Date
                  </Label>
                  <div className='col-span-3'>
                    <DatePicker
                      date={moment(field.value).toDate()}
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

        <FormField
          control={form.control}
          name='total_quantity'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='total_quantity' className='text-left'>
                    Total Quantity
                  </Label>
                  <Input id='total_quantity' type='number' className='col-span-3' {...field} />
                </div>
              </FormControl>
              <FormMessage className='text-[14px] font-normal' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='quantity_per_user'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='quantity_per_user' className='text-left'>
                    Quantity Per User
                  </Label>
                  <Input id='quantity_per_user' type='number' className='col-span-3' {...field} />
                </div>
              </FormControl>
              <FormMessage className='text-[14px] font-normal' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='minimum_price'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='minimum_price' className='text-left'>
                    Minimum Price
                  </Label>
                  <Input id='minimum_price' type='number' className='col-span-3' {...field} />
                </div>
              </FormControl>
              <FormMessage className='text-[14px] font-normal' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='applicable_type'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='applicable_type' className='text-left'>
                    Applicable Type
                  </Label>
                  <ComboBox
                    key='applicable_type'
                    placeholder='Select applicable type'
                    items={Object.values(VOUCHER_APPLICABLE_TYPE).map((type) => ({
                      value: type,
                      label: voucherApplicableTypeMapping[type],
                    }))}
                    onValueChange={field.onChange}
                  />
                </div>
              </FormControl>
              <FormMessage className='text-[14px] font-normal' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='is_active'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='is_active' className='text-left'>
                    Status
                  </Label>
                  <div className='col-span-3'>
                    <ComboBox
                      key='is_active'
                      placeholder='Status'
                      defaultValue='Active'
                      items={['Active', 'Inactive']}
                      onValueChange={(value) => field.onChange(value === 'Active')}
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
