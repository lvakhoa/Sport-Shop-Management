import { Button, ComboBox, Input, Label } from '@/components/shared'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/shared/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { GENDER } from '@/configs/enum'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { sportApi } from '@/apis'
import { ISportUpdate } from '@/interfaces/sport'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { Textarea } from '@/components/shared/text-area'

const sportSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    is_active: z.boolean(),
    file: z.instanceof(File),
  })
  .partial()

export default function EditSportForm({ sportId }: { sportId: string }) {
  const queryClient = useQueryClient()
  const { data: sportData } = useQuery({
    queryKey: queryKeys.sportDetails.gen(sportId),
    queryFn: () => sportApi.getSportById(sportId),
  })

  const form = useForm<z.infer<typeof sportSchema>>({
    resolver: zodResolver(sportSchema),
    defaultValues: {
      name: sportData?.name,
      description: sportData?.description,
      is_active: sportData?.is_active,
    },
  })

  const { mutate: editSport } = useMutation({
    mutationFn: (data: ISportUpdate) =>
      sportApi.updateSport(
        {
          name: data.name,
          description: data.description,
          is_active: data.is_active,
          file: data.file,
        },
        sportId,
      ),
    onSuccess: () => {
      toast.success('Sport updated successfully')
    },
    onError: () => {
      toast.error('Error updating sport')
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'sports',
      })
      await queryClient.invalidateQueries({ queryKey: queryKeys.employeeDetails.gen(sportId) })
    },
  })

  function onSubmit(data: z.infer<typeof sportSchema>) {
    editSport({
      name: data.name,
      description: data.description,
      is_active: data.is_active,
      file: data.file,
    })
  }

  // useEffect(() => {
  //   form.setValue('name', sportData?.name)
  //   form.setValue('description', sportData?.description)
  //   form.setValue('is_active', sportData?.is_active)
  // }, [sportData, form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4 py-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='name' className='text-left'>
                    Name
                  </Label>
                  <Input
                    id='name'
                    placeholder={sportData?.name}
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
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='description' className='text-left'>
                    Description
                  </Label>
                  <Textarea
                    id='description'
                    placeholder={sportData?.description}
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
          name='is_active'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='is_active' className='text-left'>
                    Status
                  </Label>
                  <div className='col-span-3'>
                    <ComboBox
                      key='is_active'
                      placeholder={sportData?.is_active ? 'Active' : 'Inactive'}
                      items={['Active', 'Inactive']}
                      onValueChange={(value) => field.onChange(value === 'Active')}
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
          name='file'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='file' className='text-left'>
                    Logo
                  </Label>
                  <Input
                    type='file'
                    id='file'
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    className='col-span-3'
                  />
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
          Edit Sport
        </Button>
      </form>
    </Form>
  )
}
