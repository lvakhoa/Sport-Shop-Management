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
import { SuccessfulSendMessage } from './successful-send-email'
import { useMutation } from '@tanstack/react-query'
import { authApi } from '@/apis'
import { toast } from 'react-toastify'

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
})

interface IForgotPasswordForm {
  className?: string
}

export function ForgotPasswordForm({ className }: IForgotPasswordForm) {
  const [sendState, setSendState] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(0)

  const forgotPassword = useMutation({
    mutationFn: (email: string) => authApi.forgotPassword(email),
    onSuccess: () => {
      setSecondsLeft(60)
      setSendState(true)
    },
    onError: (error) => {
      toast.error(error.message)
      // có thể thay thế bằng display error email sending
    },
  })

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (secondsLeft > 0) {
      intervalId = setInterval(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1)
      }, 1000)
    }

    return () => clearInterval(intervalId)
  }, [secondsLeft])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    forgotPassword.mutate(data.email)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-3', className)}>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='relative flex w-full items-center'>
                  <Input
                    className='h-[55px] w-full pl-[45px] text-[20px]'
                    placeholder='Email'
                    {...field}
                  />
                  <Image
                    className='absolute m-3 text-muted-foreground'
                    alt=''
                    src='/icons/user.svg'
                    width={24}
                    height={24}
                  />
                </div>
              </FormControl>
              <FormMessage className='text-[16px] font-normal' />
            </FormItem>
          )}
        />
        {sendState && <SuccessfulSendMessage />}
        <Button
          type='submit'
          disabled={forgotPassword.isPending || secondsLeft > 0}
          className='flex h-[50px] w-full text-[20px]'
        >
          {secondsLeft == 0 ? 'Send email' : `Resend after ${secondsLeft}s`}
        </Button>
      </form>
    </Form>
  )
}
