import { categoryApi, eventApi, productApi, voucherApi } from '@/apis'
import { queryKeys } from '@/configs'
import { IProductRequest } from '@/interfaces/product'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/shared/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DatePicker } from '@/components/shared'
import {
  Button,
  Checkbox,
  ComboBox,
  Input,
  Label,
  ScrollArea,
  Separator,
} from '@/components/shared'
import { STATUS } from '@/configs/enum'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shared/popover'
import { IVoucherRequest } from '@/interfaces/voucher'
import moment from 'moment'
import { IEventRequest } from '@/interfaces/event'
import { Textarea } from '@/components/shared/text-area'

const productSchema = z.object({
  product_id: z.string(),
})

const eventSchema = z
  .object({
    title: z.string(),
    content: z.string(),
    sale_percent: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    file: z
      .instanceof(File)
      .refine((file) => file.type.startsWith('image/'), {
        message: 'Media must be an image file',
      })
      .optional(),
    product_list: z.array(productSchema),
  })
  .partial()

export default function EditEventForm({ eventId }: { eventId: string }) {
  const queryClient = useQueryClient()

  const { data: event } = useQuery({
    queryKey: queryKeys.eventDetails.gen(eventId),
    queryFn: () => eventApi.getEventById(eventId),
  })

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

  const { mutate: editEvent } = useMutation({
    mutationFn: (data: IEventRequest) =>
      eventApi.updateEvent(
        {
          title: data.title,
          content: data.content,
          sale_percent: data.sale_percent,
          start_date: data.start_date,
          end_date: data.end_date,
          product_list: data.product_list,
          file: data.file,
        },
        eventId,
      ),
    onSuccess: () => {
      toast.success('Event updated successfully')
    },
    onError: () => {
      toast.error('Error updating event')
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'events',
      })
      await queryClient.invalidateQueries({ queryKey: queryKeys.eventDetails.gen(eventId) })
    },
  })

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      content: '',
      sale_percent: '',
      start_date: moment().toISOString(),
      end_date: moment().toISOString(),
      product_list: [],
    },
  })

  function onSubmit(data: z.infer<typeof eventSchema>) {
    editEvent({
      title: data.title,
      content: data.content,
      sale_percent: parseFloat(data.sale_percent ?? '0'),
      start_date: moment(data.start_date).toDate(),
      end_date: moment(data.end_date).toDate(),
      product_list: selectedProducts,
      file: data.file,
    })
  }

  useEffect(() => {
    if (!!event && !!event.product) {
      const productIdList = event.product.map((c) => ({ product_id: c.id }))
      setSelectedProducts(productIdList)
      form.setValue('title', event.title ?? '')
      form.setValue('content', event.content ?? '')
      form.setValue('sale_percent', event.sale_percent.toString())
      form.setValue('start_date', moment(event.start_date).toString())
      form.setValue('end_date', moment(event.end_date).toString())
      form.setValue('product_list', productIdList)
    }
  }, [event, form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4 py-4'>
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
              <FormMessage className='text-[16px] font-normal' />
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
              <FormMessage className='text-[16px] font-normal' />
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
                        field.onChange(moment(val).toString())
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
                        field.onChange(moment(val).toString())
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
                                checked={
                                  selectedProducts.findIndex((c) => c.product_id === product.id) !==
                                  -1
                                }
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
              <FormMessage className='text-[16px] font-normal' />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          className='flex gap-[5px] bg-secondary duration-300 hover:bg-[#739AF4]'
        >
          Edit Event
        </Button>
      </form>
    </Form>
  )
}
