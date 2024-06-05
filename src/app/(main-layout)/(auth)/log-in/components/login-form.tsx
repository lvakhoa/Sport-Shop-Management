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
import Link from 'next/link'
import { useAuth } from '@/hooks'
import { PATH_NAME } from '@/configs'
import AuthButton from '../../components/AuthButton'

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
})

interface LoginForm {
  className?: string
}

export function LoginForm({ className }: LoginForm) {
  const { logIn } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    logIn.mutate({ email: data.email, password: data.password })
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
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='relative flex w-full items-center'>
                  <Input
                    className='h-[55px] w-full pl-[45px] text-[20px]'
                    placeholder='Password'
                    type='password'
                    {...field}
                  />
                  <Image
                    alt=''
                    src='/icons/lock.svg'
                    className='absolute m-3 text-muted-foreground'
                    width={24}
                    height={24}
                  />
                </div>
              </FormControl>
              <FormMessage className='text-[16px] font-normal' />
            </FormItem>
          )}
        />
        <Link className='flex cursor-pointer justify-end' href={PATH_NAME.FORGOT_PASSWORD}>
          <span className='text-[16px] hover:underline'>Forgot password?</span>
        </Link>
        <AuthButton isLoading={logIn.isPending} text='Login' />
      </form>
    </Form>
  )
}
