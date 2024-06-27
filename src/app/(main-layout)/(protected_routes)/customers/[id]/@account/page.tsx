'use client'

import { customerAccountApi, customerApi } from '@/apis'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/shared/form'
import { Button, ContentCard } from '@/components/shared'
import { queryKeys } from '@/configs'
import { useQuery, useMutation } from '@tanstack/react-query'
import { notFound, useParams } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import styles from '@/components/shared/ContentCard/ContentCard.module.css'
import { toast } from 'react-toastify'
import { Input, Label } from '@/components/shared'
import { Save } from 'lucide-react'

const customerAccSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email(),
  password: z.string({ required_error: 'Password is required' }),
})

function AccountPage() {
  const { id: customerId } = useParams<{ id: string }>()
  const { data: customerData } = useQuery({
    queryKey: queryKeys.customerDetails.gen(customerId),
    queryFn: () => customerApi.getCustomerById(customerId),
    throwOnError(error, query) {
      notFound()
    },
  })

  const accountId = customerData?.account_id || ''

  const form = useForm<z.infer<typeof customerAccSchema>>({
    resolver: zodResolver(customerAccSchema),
  })

  const { mutate: updateAccount } = useMutation({
    mutationFn: (data: z.infer<typeof customerAccSchema>) =>
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
    onError: () => {
      toast.error('Error updating account')
    },
  })

  function onSubmit(data: z.infer<typeof customerAccSchema>) {
    updateAccount({
      email: data.email,
      password: data.password,
    })
  }

  return (
    <ContentCard title='Account'>
      {!accountId && <div className='flex h-60 items-center justify-center'>No account found</div>}
      {accountId && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='grid grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <Label htmlFor='email' className={styles.info_title}>
                        Email
                      </Label>
                      <Input id='email' className={styles.info_content} {...field} />
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
                    <div>
                      <Label htmlFor='password' className={styles.info_title}>
                        Password
                      </Label>
                      <Input
                        type='password'
                        id='password'
                        className={styles.info_content}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className='text-[14px] font-normal' />
                </FormItem>
              )}
            />
            <div>
              <Button
                type='submit'
                className='items-center justify-center gap-[5px] bg-secondary duration-300 hover:bg-[#739AF4]'
              >
                <Save />
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </ContentCard>
  )
}

export default AccountPage
