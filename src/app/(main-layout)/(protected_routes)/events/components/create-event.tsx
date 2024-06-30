import { categoryApi, eventApi, productApi } from '@/apis'
import { queryKeys } from '@/configs'
import { IProductRequest } from '@/interfaces/product'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/shared/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Checkbox,
  ComboBox,
  DatePicker,
  Input,
  Label,
  ScrollArea,
  Separator,
} from '@/components/shared'
import { STATUS } from '@/configs/enum'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shared/popover'
import { IEventRequest } from '@/interfaces/event'
import moment from 'moment'
import { Textarea } from '@/components/shared/text-area'

const productSchema = z.object({
  product_id: z.string().min(1, {
    message: 'Product id is required',
  }),
})

const eventSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required',
  }),
  content: z.string().min(1, {
    message: 'Content is required',
  }),
  start_date: z.string().refine((date) => new Date(date) >= new Date(), {
    message: 'Start date must be in the future',
  }),
  end_date: z.string().refine((date) => new Date(date) >= new Date(), {
    message: 'End date must be in the future',
  }),
  sale_percent: z.string().refine(
    (value) => {
      const numberValue = parseFloat(value)
      return !isNaN(numberValue) && numberValue >= 0 && numberValue <= 1
    },
    {
      message: 'Sale percent must be between 0 and 1',
    },
  ),
  file: z
    .instanceof(File)
    .refine((file) => file.type.startsWith('image/'), {
      message: 'Media must be an image file',
    })
    .optional(),
  product_list: z.array(productSchema),
})

export default function CreateEventForm() {
  const queryClient = useQueryClient()
  const { data: products, isPending } = useQuery({
    queryKey: queryKeys.allProducts,
    queryFn: () => productApi.getAllProduct(),
  })

  const [selectedProducts, setSelectedProducts] = useState<z.infer<typeof productSchema>[]>([])
  const handleAddCategory = (productId: string) => {
    setSelectedProducts([...selectedProducts, { product_id: productId }])
  }
  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter((c) => c.product_id !== productId))
  }

  const { mutate: createEvent } = useMutation({
    mutationFn: (data: IEventRequest) =>
      eventApi.createEvent({
        title: data.title,
        content: data.content,
        start_date: data.start_date,
        end_date: data.end_date,
        sale_percent: data.sale_percent,
        file: data.file,
        product_list: data.product_list,
      }),
    onSuccess: () => {
      toast.success('Event created successfully')
    },
    onError: () => {
      toast.error('Error creating event')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'events' })
    },
  })

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      content: '',
      start_date: moment().toISOString(),
      end_date: moment().toISOString(),
      sale_percent: '',
      product_list: [],
    },
  })

  function onSubmit(data: z.infer<typeof eventSchema>) {
    createEvent({
      title: data.title,
      content: data.content,
      start_date: moment(data.start_date).toDate(),
      end_date: moment(data.end_date).toDate(),
      sale_percent: parseFloat(data.sale_percent),
      file: data.file,
      product_list: selectedProducts,
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='grid gap-4 py-4'
        encType='multipart/form-data'
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='title' className='text-left'>
                    Title
                  </Label>
                  <Input id='title' className='col-span-3' {...field} />
                </div>
              </FormControl>
              <FormMessage className='text-[14px] font-normal' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='start_date'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='start_date' className='text-left'>
                    Start Date
                  </Label>
                  <div className='col-span-3'>
                    <DatePicker
                      date={moment(field.value).toDate()}
                      selectDate={(val) => {
                        field.onChange(val?.toISOString() ?? moment().toISOString())
                      }}
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
          name='end_date'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='end_date' className='text-left'>
                    End Date
                  </Label>
                  <div className='col-span-3'>
                    <DatePicker
                      date={moment(field.value).toDate()}
                      selectDate={(val) => {
                        field.onChange(val?.toISOString() ?? moment().toISOString())
                      }}
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
          name='sale_percent'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='sale_percent' className='text-left'>
                    Sale Percent
                  </Label>
                  <Input id='sale_percent' className='col-span-3' {...field} />
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
                  <Label htmlFor='media' className='text-left'>
                    Upload Image
                  </Label>
                  <Input
                    id='file'
                    type='file'
                    className='col-span-3'
                    onChange={(e) => {
                      const files = e.target.files
                      if (files && files[0]) {
                        field.onChange(files[0])
                      }
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage className='text-[14px] font-normal' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='product_list'
          render={({ field }) => (
            <FormItem>
              <Popover>
                <FormControl>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='product_list' className='text-left'>
                      Products
                    </Label>
                    <PopoverTrigger asChild>
                      <Button variant='outline' className='col-span-3'>
                        Select
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='col-span-3' side='bottom'>
                      <ScrollArea className='h-44 w-full'>
                        {products?.map((product) => (
                          <div key={product.id}>
                            <div className='flex items-center gap-2'>
                              <Checkbox
                                id={product.id}
                                onCheckedChange={(isChecked) =>
                                  isChecked
                                    ? handleAddCategory(product.id)
                                    : handleRemoveProduct(product.id)
                                }
                              />
                              <span className='text-sm leading-none'>{product.name}</span>
                            </div>
                            <Separator className='my-2' />
                          </div>
                        ))}
                      </ScrollArea>
                    </PopoverContent>
                  </div>
                </FormControl>
              </Popover>
              <FormMessage className='text-[14px] font-normal' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='content' className='text-left'>
                    Content
                  </Label>
                  <Textarea id='content' className='col-span-3' {...field} />
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
          Add Event
        </Button>
      </form>
    </Form>
  )
}
