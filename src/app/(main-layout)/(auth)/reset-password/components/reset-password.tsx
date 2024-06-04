'use client'
import { Button } from '@/components/shared'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shared/form'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Input } from '@/components/shared/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState, useEffect } from 'react'
import { SuccessfulSendMessage } from '../../forgot-password/components/successful-send-email'

const formSchema = z
  .object({
    password: z.string(),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Password did not match',
    path: ['confirm'],
  })

interface IResetPasswordForm {
  className?: string
}

export function ResetPasswordForm({ className }: IResetPasswordForm) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirm: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {}

  return (
    <Form {...form}>
      <form
        method='post'
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('space-y-3', className)}
      >
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='relative flex w-full items-center'>
                  <Input
                    className='h-[55px] w-full pl-[45px] text-[20px]'
                    placeholder='New password'
                    {...field}
                    type='password'
                  />
                  <Image
                    className='absolute m-3 text-muted-foreground'
                    alt=''
                    src='/icons/lock.svg'
                    width={24}
                    height={24}
                  />
                </div>
              </FormControl>
              <FormMessage className='text-[20px] font-normal' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirm'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='relative flex w-full items-center'>
                  <Input
                    className='h-[55px] w-full pl-[45px] text-[20px]'
                    placeholder='Confirm new password'
                    {...field}
                    type='password'
                  />
                  <Image
                    className='absolute m-3 text-muted-foreground'
                    alt=''
                    src='/icons/lock.svg'
                    width={24}
                    height={24}
                  />
                </div>
              </FormControl>
              <FormMessage className='text-[20px] font-normal' />
            </FormItem>
          )}
        />
        <Button type='submit' className='flex h-[50px] w-full text-[20px]'>
          Submit Password
        </Button>
      </form>
    </Form>
  )
}
