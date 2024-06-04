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

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})

interface IForgotPasswordForm {
  className?: string
}

export function ForgotPasswordForm({ className }: IForgotPasswordForm) {
  const [sendState, setSendState] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(0)

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (secondsLeft > 0) {
      intervalId = setInterval(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1)
      }, 1000)
    }

    return () => clearInterval(intervalId)
  }, [secondsLeft])

  const handleClick = () => {
    setSecondsLeft(60)
    setSendState(true)
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    handleClick()
  }

  return (
    <Form {...form}>
      <form
        method='post'
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('space-y-3', className)}
      >
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='relative flex w-full items-center'>
                  <Input
                    className='h-[55px] w-full pl-[45px] text-[20px]'
                    placeholder='Username'
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
          disabled={secondsLeft > 0}
          className='flex h-[50px] w-full text-[20px]'
        >
          {secondsLeft == 0 ? 'Send email' : `Resend after ${secondsLeft}s`}
        </Button>
      </form>
    </Form>
  )
}
