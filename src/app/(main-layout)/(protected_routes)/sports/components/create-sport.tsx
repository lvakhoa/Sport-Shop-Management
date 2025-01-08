import { Button, ComboBox, Input, Label } from '@/components/shared'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/shared/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { GENDER } from '@/configs/enum'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { sportApi } from '@/apis'
import { ISportCreate } from '@/interfaces/sport'
import { toast } from 'react-toastify'
import { Textarea } from '@/components/shared/text-area'

const sportSchema = z.object({
  name: z.string(),
  description: z.string(),
  is_active: z.boolean(),
  file: z.instanceof(File).nullable(),
})

export default function CreateSportForm() {
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof sportSchema>>({
    resolver: zodResolver(sportSchema),
    defaultValues: {
      name: '',
      description: '',
      is_active: true,
      file: null,
    },
  })

  const { mutate: createSport } = useMutation({
    mutationFn: (data: ISportCreate) =>
      sportApi.createSport({
        name: data.name,
        description: data.description,
        is_active: data.is_active,
        file: data.file,
      }),
    onSuccess: () => {
      toast.success('Sport created successfully')
    },
    onError: () => {
      toast.error('Error creating sport')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'sports' })
    },
  })

  function onSubmit(data: z.infer<typeof sportSchema>) {
    createSport({
      name: data.name,
      description: data.description,
      is_active: data.is_active,
      file: data.file,
    })
  }

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
                  <Input id='name' className='col-span-3' {...field} />
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
                  <Textarea id='description' className='col-span-3' {...field} />
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
                      placeholder='Status'
                      defaultValue='Active'
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
          Add Sport
        </Button>
      </form>
    </Form>
  )
}
