import { Button, ComboBox, Input, Label } from '@/components/shared'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/shared/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { GENDER } from '@/configs/enum'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { customerApi } from '@/apis'
import { ICustomerRequest } from '@/interfaces/customer'
import { toast } from 'react-toastify'

const customerSchema = z
  .object({
    fullname: z.string().min(1),
    phone: z.string().min(1),
    gender: z.nativeEnum(GENDER),
    group_user_id: z.string().min(1),
  })
  .partial()

export default function EditCustomerForm({ customerId }: { customerId: string }) {
  const queryClient = useQueryClient()
  const { data: customerData } = useQuery({
    queryKey: queryKeys.customerDetails.gen(customerId),
    queryFn: () => customerApi.getCustomerById(customerId),
  })

  const form = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      group_user_id: 'customergroupid',
    },
  })

  const { mutate: editCustomer } = useMutation({
    mutationFn: (data: ICustomerRequest) =>
      customerApi.updateCustomer(
        {
          fullname: data.fullname,
          phone: data.phone,
          gender: data.gender,
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

  function onSubmit(data: z.infer<typeof customerSchema>) {
    editCustomer({
      fullname: data.fullname,
      phone: data.phone,
      gender: data.gender,
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
          Edit Customer
        </Button>
      </form>
    </Form>
  )
}
