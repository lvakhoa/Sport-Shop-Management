import { Button, ComboBox, Input, Label } from '@/components/shared'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/shared/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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

const gender: string[] = ['MALE', 'FEMALE']
const rank: RANK[] = [RANK.COPPER, RANK.SILVER, RANK.GOLD]

const customerSchema = z
  .object({
    account_id: z.string(),
    fullname: z.string(),
    phone: z.string(),
    email: z.string().email(),
    gender: z.enum(['MALE', 'FEMALE']),
    rank: z.enum([RANK.COPPER, RANK.SILVER, RANK.GOLD]),
    loyalty_point: z.number(),
  })
  .partial()

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
      email: '',
      gender: 'MALE',
      rank: RANK.COPPER,
      loyalty_point: 0,
    },
  })

  const { mutate: createCustomer } = useMutation({
    mutationFn: (data: ICustomerRequest) =>
      customerApi.createCustomer({
        account_id: data.account_id,
        fullname: data.fullname,
        phone: data.phone,
        email: data.email,
        gender: data.gender,
        rank: data.rank,
        loyalty_point: data.loyalty_point,
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
      account_id: data.account_id,
      fullname: data.fullname,
      phone: data.phone,
      email: data.email,
      gender: data.gender,
      rank: data.rank,
      loyalty_point: data.loyalty_point,
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
              <Select value={field.value} onValueChange={field.onChange}>
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
                            if (!!acc)
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
                      placeholder='Rank'
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
