import { Button, ComboBox, Input, Label } from '@/components/shared'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/shared/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import moment from 'moment'
import { GENDER, RANK } from '@/configs/enum'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { customerAccountApi, customerApi } from '@/apis'
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
import { useEffect } from 'react'

const gender: string[] = ['MALE', 'FEMALE']
const rank: RANK[] = [RANK.COPPER, RANK.SILVER, RANK.GOLD]

const customerSchema = z
  .object({
    account_id: z.string().nullable(),
    fullname: z.string(),
    phone: z
      .string()
      .min(10)
      .regex(/^\d{10,11}$/, 'Invalid phone number'),
    email: z.string().email().optional(),
    gender: z.enum(['MALE', 'FEMALE']),
    rank: z.enum([RANK.COPPER, RANK.SILVER, RANK.GOLD]),
    loyalty_point: z.string(),
  })
  .partial()

export default function EditCustomerForm({ customerId }: { customerId: string }) {
  const queryClient = useQueryClient()
  const { data: customerData } = useQuery({
    queryKey: queryKeys.customerDetails.gen(customerId),
    queryFn: () => customerApi.getCustomerById(customerId),
  })
  const { data: accounts } = useQuery({
    queryKey: queryKeys.customerAccount,
    queryFn: () => customerAccountApi.getAllCustomerAccounts(),
  })

  const form = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
  })

  const { mutate: editCustomer } = useMutation({
    mutationFn: (data: ICustomerRequest) =>
      customerApi.updateCustomer(
        {
          account_id: data.account_id,
          fullname: data.fullname,
          email: data.email,
          phone: data.phone,
          gender: data.gender,
          rank: data.rank,
          loyalty_point: data.loyalty_point,
        },
        customerId,
      ),
    onSuccess: () => {
      toast.success('Customer updated successfully')
    },
    onError: () => {
      toast.error('Error updating customer')
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'customers',
      })
      await queryClient.invalidateQueries({ queryKey: queryKeys.employeeDetails.gen(customerId) })
    },
  })

  const account = accounts?.find((acc) => acc?.customer?.id === customerId)

  function onSubmit(data: z.infer<typeof customerSchema>) {
    editCustomer({
      account_id: data.account_id === null ? undefined : data.account_id,
      fullname: data.fullname,
      email: data.email,
      phone: data.phone,
      gender: data.gender,
      rank: data.rank,
      loyalty_point: parseInt(data.loyalty_point || '0'),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4 py-4'>
        <FormField
          control={form.control}
          name='fullname'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='fullname' className='text-left'>
                    Name
                  </Label>
                  <Input
                    id='fullname'
                    placeholder={customerData?.fullname}
                    className='col-span-3'
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
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='phone' className='text-left'>
                    Phone
                  </Label>
                  <Input
                    id='phone'
                    placeholder={customerData?.phone}
                    className='col-span-3'
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
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='email' className='text-left'>
                    Email
                  </Label>
                  <Input
                    id='email'
                    placeholder={customerData?.email}
                    className='col-span-3'
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
          name='gender'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='gender' className='text-left'>
                    Gender
                  </Label>
                  <div className='col-span-3'>
                    <ComboBox
                      key='gender'
                      placeholder={customerData?.gender as string}
                      items={gender}
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
          name='account_id'
          render={({ field }) => (
            <FormItem>
              <Select
                value={field.value === null ? undefined : field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='account_id' className='text-left'>
                      Account
                    </Label>
                    <SelectTrigger className='col-span-3'>
                      <SelectValue
                        placeholder={<span className='text-muted-foreground'>Account</span>}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {!!accounts &&
                          accounts.map((acc) => {
                            if (!acc.customer || acc.customer.id === customerId)
                              return (
                                <SelectItem key={acc.id} value={acc.id}>
                                  {acc.email}
                                </SelectItem>
                              )
                          })}
                      </SelectGroup>
                    </SelectContent>
                  </div>
                </FormControl>
                <FormMessage className='text-[14px] font-normal' />
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='rank'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='rank' className='text-left'>
                    Rank
                  </Label>
                  <div className='col-span-3'>
                    <ComboBox
                      key='rank'
                      placeholder={customerData?.rank as string}
                      items={rank}
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
          name='loyalty_point'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='loyalty_point' className='text-left'>
                    Loyalty Point
                  </Label>
                  <Input
                    id='loyalty_point'
                    placeholder={customerData?.loyalty_point.toString()}
                    className='col-span-3'
                    {...field}
                  />
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
          Edit Customer
        </Button>
      </form>
    </Form>
  )
}
