import { Button, ComboBox, Input, Label } from '@/components/shared'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/shared/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { GENDER } from '@/configs/enum'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { addressApi, customerAccountApi, customerApi } from '@/apis'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/select'
import { ICustomerRequest } from '@/interfaces/customer'
import { toast } from 'react-toastify'
import { IAddressRequest } from '@/interfaces/address'

const gender: string[] = ['MALE', 'FEMALE']

const addressSchema = z.object({
  street: z.string({ required_error: 'Street is required' }),
  ward: z.string({ required_error: 'Ward is required' }),
  district: z.string({ required_error: 'District is required' }),
  city: z.string({ required_error: 'City is required' }),
})

export default function CreateAddressForm() {
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
  })

  const { mutate: createAddress } = useMutation({
    mutationFn: (data: IAddressRequest) =>
      addressApi.create({
        street: data.street,
        ward: data.ward,
        district: data.district,
        city: data.city,
      }),
    onSuccess: () => {
      toast.success('Address created successfully')
    },
    onError: () => {
      toast.error('Error creating address')
    },
  })

  function onSubmit(data: z.infer<typeof addressSchema>) {
    createAddress({
      street: data.street,
      ward: data.ward,
      district: data.district,
      city: data.city,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4 py-4'>
        <FormField
          control={form.control}
          name='street'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='street' className='text-left'>
                    Street
                  </Label>
                  <Input id='street' className='col-span-3' {...field} />
                </div>
              </FormControl>
              <FormMessage className='text-[14px] font-normal' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='ward'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='ward' className='text-left'>
                    Ward
                  </Label>
                  <Input id='ward' className='col-span-3' {...field} />
                </div>
              </FormControl>
              <FormMessage className='text-[14px] font-normal' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='district'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='district' className='text-left'>
                    District
                  </Label>
                  <Input id='district' className='col-span-3' {...field} />
                </div>
              </FormControl>
              <FormMessage className='text-[14px] font-normal' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='city'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='city' className='text-left'>
                    City
                  </Label>
                  <Input id='city' className='col-span-3' {...field} />
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
          Add Address
        </Button>
      </form>
    </Form>
  )
}
