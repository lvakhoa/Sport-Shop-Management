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

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string(),
})

interface LoginForm {
  className?: string
}

export function LoginForm({ className }: LoginForm) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
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
        <Link className='flex cursor-pointer justify-end' href='/forgot-password'>
          <span className='text-[16px]'>Forgot password?</span>
        </Link>
        <Button type='submit' className='flex h-[50px] w-full text-[20px]'>
          Login
        </Button>
      </form>
    </Form>
  )
}
