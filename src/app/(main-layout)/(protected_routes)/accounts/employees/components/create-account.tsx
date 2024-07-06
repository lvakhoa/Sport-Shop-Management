'use client'

import { employeeAccountApi, roleApi } from '@/apis'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from '@/components/shared/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/select'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Label } from '@/components/shared'
import { IEmployeeAccountRequest } from '@/interfaces/account'
import { queryKeys } from '@/configs'

const employeeAccountSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  role_id: z.string(),
})

export default function CreateemployeeAccountForm() {
  const queryClient = useQueryClient()

  const { data: roles } = useQuery({
    queryKey: queryKeys.roles,
    queryFn: () => roleApi.getAllRoles(),
  })

  const { mutate: createEmployeeAccount } = useMutation({
    mutationFn: (data: IEmployeeAccountRequest) =>
      employeeAccountApi.createEmployeeAccount({
        email: data.email,
        password: data.password,
        role_id: data.role_id,
      }),
    onSuccess: () => {
      toast.success('Employee account created successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'employee-account',
      })
    },
  })

  const form = useForm<z.infer<typeof employeeAccountSchema>>({
    resolver: zodResolver(employeeAccountSchema),
  })

  function onSubmit(data: z.infer<typeof employeeAccountSchema>) {
    createEmployeeAccount({
      email: data.email,
      password: data.password,
      role_id: data.role_id,
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
                  <Input id='email' className='col-span-3' {...field} />
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

        <FormField
          control={form.control}
          name='role_id'
          render={({ field }) => (
            <FormItem>
              <Select
                value={field.value === null ? undefined : field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel>Role</FormLabel>
                    <SelectTrigger className='col-span-3'>
                      <SelectValue
                        placeholder={<span className='text-muted-foreground'>Role</span>}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {!!roles &&
                          roles.map((acc) => (
                            <SelectItem key={acc.id} value={acc.id}>
                              {acc.title}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </div>
                </FormControl>
                <FormMessage className='text-[14px] font-normal' />
              </Select>
            </FormItem>
          )}
        />

        <Button
          type='submit'
          className='flex gap-[5px] bg-secondary duration-300 hover:bg-[#739AF4]'
        >
          Create Employee
        </Button>
      </form>
    </Form>
  )
}
