import { Button, ComboBox, Input, Label } from '@/components/shared'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/shared/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { GENDER } from '@/configs/enum'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { customerAccountApi, customerApi } from '@/apis'
import { ICustomerRequest } from '@/interfaces/customer'
import { toast } from 'react-toastify'

const customerSchema = z.object({
  fullname: z.string(),
  phone: z
    .string()
    .min(10)
    .regex(/^\d{10,11}$/, 'Invalid phone number'),
  gender: z.nativeEnum(GENDER),
  email: z.string().email(),
  group_user_id: z.string(),
})

export default function CreateCustomerForm() {
  const queryClient = useQueryClient()
  const { data: accounts } = useQuery({
    queryKey: queryKeys.customerAccount,
    queryFn: () => customerAccountApi.getAllCustomerAccounts(),
  })

  const form = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      fullname: '',
      phone: '',
      gender: GENDER.MALE,
      email: '',
      group_user_id: 'customergroupid', // group_user_id is the same for all customers
    },
  })

  const { mutate: createCustomer } = useMutation({
    mutationFn: (data: ICustomerRequest) =>
      customerApi.createCustomer({
        fullname: data.fullname,
        phone: data.phone,
        gender: data.gender,
        email: data.email,
      }),
    onSuccess: () => {
      toast.success('Customer created successfully')
    },
    onError: () => {
      toast.error('Error creating customer')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'customers' })
    },
  })

  function onSubmit(data: z.infer<typeof customerSchema>) {
    createCustomer({
      fullname: data.fullname,
      phone: data.phone,
      gender: data.gender,
      email: data.email,
      group_user_id: data.group_user_id,
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
                  <Input id='fullname' className='col-span-3' {...field} />
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
                  <Input id='phone' className='col-span-3' {...field} />
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
                  <Input id='email' className='col-span-3' {...field} />
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
                      placeholder='Gender'
                      items={Object.values(GENDER)}
                      onValueChange={field.onChange}
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
          Add Customer
        </Button>
      </form>
    </Form>
  )
}
