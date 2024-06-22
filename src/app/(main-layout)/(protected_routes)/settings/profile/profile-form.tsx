'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/shared/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/shared/form'
import { Input } from '@/components/shared/input'
import ComboBox from '@/components/shared/ComboBox'
import { useProfile } from '@/hooks'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { IInfo } from '@/interfaces'
import { authApi } from '@/apis'

const profileFormSchema = z.object({
  fullname: z.string().optional(),
  phone: z.string().optional(),
  gender: z.enum(['MALE', 'FEMALE']).optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileForm() {
  const profile = useProfile()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullname: profile.data?.fullname,
      phone: profile.data?.phone,
      gender: profile.data?.gender,
    },
  })

  const { mutate: updateInfo } = useMutation({
    mutationFn: (data: IInfo) =>
      authApi.updateInfo({
        fullname: data.fullname,
        phone: data.phone,
        gender: data.gender,
      }),
    onSuccess: () => {
      toast.success('Employee created successfully')
    },
    onError: () => {
      toast.error('Error creating employee')
    },
  })

  const gender: string[] = ['MALE', 'FEMALE']

  function onSubmit(data: ProfileFormValues) {
    updateInfo({
      fullname: data.fullname,
      phone: data.phone,
      gender: data.gender,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid grid-cols-2 gap-[15px] pb-[15px] max-[1024px]:grid-cols-1'>
          <FormField
            control={form.control}
            name='fullname'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fullname</FormLabel>
                <FormControl>
                  <Input placeholder={profile.data?.fullname} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder={profile.data?.phone} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='gender'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <ComboBox
                    key='gender'
                    placeholder={profile.data?.gender!}
                    items={gender}
                    onValueChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type='submit'>Update profile</Button>
      </form>
    </Form>
  )
}
