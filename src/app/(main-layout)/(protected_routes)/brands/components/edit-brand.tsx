import { Button, ComboBox, Input, Label } from '@/components/shared'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/shared/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { GENDER } from '@/configs/enum'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { brandApi } from '@/apis'
import { IBrandUpdate } from '@/interfaces/brand'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { Textarea } from '@/components/shared/text-area'

const brandSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    is_active: z.boolean(),
    file: z.instanceof(File),
  })
  .partial()

export default function EditBrandForm({ brandId }: { brandId: string }) {
  const queryClient = useQueryClient()
  const { data: brandData } = useQuery({
    queryKey: queryKeys.brandDetails.gen(brandId),
    queryFn: () => brandApi.getBrandById(brandId),
  })

  const form = useForm<z.infer<typeof brandSchema>>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: brandData?.name,
      description: brandData?.description,
      is_active: brandData?.is_active,
    },
  })

  const { mutate: editBrand } = useMutation({
    mutationFn: (data: IBrandUpdate) =>
      brandApi.updateBrand(
        {
          name: data.name,
          description: data.description,
          is_active: data.is_active,
          file: data.file,
        },
        brandId,
      ),
    onSuccess: () => {
      toast.success('Brand updated successfully')
    },
    onError: () => {
      toast.error('Error updating brand')
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'brands',
      })
      await queryClient.invalidateQueries({ queryKey: queryKeys.employeeDetails.gen(brandId) })
    },
  })

  function onSubmit(data: z.infer<typeof brandSchema>) {
    editBrand({
      name: data.name,
      description: data.description,
      is_active: data.is_active,
      file: data.file,
    })
  }

  // useEffect(() => {
  //   form.setValue('name', brandData?.name)
  //   form.setValue('description', brandData?.description)
  //   form.setValue('is_active', brandData?.is_active)
  // }, [brandData, form])

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
                    placeholder={brandData?.name}
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
                    placeholder={brandData?.description}
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
                      placeholder={brandData?.is_active ? 'Active' : 'Inactive'}
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
          Edit Brand
        </Button>
      </form>
    </Form>
  )
}
