'use client'

import { customerAccountApi } from '@/apis'
import { queryKeys } from '@/configs'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/shared/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Label } from '@/components/shared'
import { ICustomerAccountRequest } from '@/interfaces/account'

const customerAccountSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().optional(),
})

export default function EditCustomerAccountForm({ accountId }: { accountId: string }) {
  const queryClient = useQueryClient()

  const { data: account } = useQuery({
    queryKey: queryKeys.customerAccount,
    queryFn: () => customerAccountApi.getCustomerAccountById(accountId),
  })

  const { mutate: editCustomerAccount } = useMutation({
    mutationFn: (data: ICustomerAccountRequest) =>
      customerAccountApi.updateCustomerAccount(
        {
          email: data.email,
          password: data.password,
        },
        accountId,
      ),
    onSuccess: () => {
      toast.success('Account updated successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'customer-account',
      })
      await queryClient.invalidateQueries({
        queryKey: queryKeys.customerAccountDetails.gen(accountId),
      })
    },
  })

  const form = useForm<z.infer<typeof customerAccountSchema>>({
    resolver: zodResolver(customerAccountSchema),
  })

  function onSubmit(data: z.infer<typeof customerAccountSchema>) {
    editCustomerAccount({
      email: data.email,
      password: data.password,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4 py-4'>
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
                    placeholder={account?.email}
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
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='password' className='text-left'>
                    Password
                  </Label>
                  <Input id='password' type='password' className='col-span-3' {...field} />
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
