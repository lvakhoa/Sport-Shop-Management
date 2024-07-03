'use client'

import { categoryApi, eventApi, productApi } from '@/apis'
import {
  AlertPopup,
  Button,
  Checkbox,
  ContentCard,
  Label,
  ScrollArea,
  Separator,
} from '@/components/shared'
import { PATH_NAME, queryKeys } from '@/configs'
import { cn } from '@/lib/utils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Eye, Trash2 } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/shared/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shared/popover'
import { IEventRequest } from '@/interfaces/event'
import { toast } from 'react-toastify'
import { ROLE_TITLE } from '@/configs/enum'

const productSchema = z.object({
  product_id: z.string().min(1, {
    message: 'Product id is required',
  }),
})

const eventSchema = z.object({
  product_list: z.array(productSchema),
})

function UpdateProductInEvent({
  eventId,
  productsOfEvent,
}: {
  eventId: string
  productsOfEvent: z.infer<typeof productSchema>[]
}) {
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      product_list: [],
    },
  })
  const queryClient = useQueryClient()

  const { data: products } = useQuery({
    queryKey: queryKeys.allProducts,
    queryFn: () => productApi.getAllProduct(),
  })

  const [selectedProducts, setSelectedProducts] = useState<z.infer<typeof productSchema>[]>([])
  const handleAddProduct = (productId: string) => {
    setSelectedProducts([...selectedProducts, { product_id: productId }])
  }
  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter((c) => c.product_id !== productId))
  }

  const { mutate: updateProductInEvent } = useMutation({
    mutationFn: (data: IEventRequest) =>
      eventApi.updateEvent(
        {
          product_list: data.product_list,
        },
        eventId,
      ),
    onError: (error) => {
      toast.error(error.message)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.eventDetails.gen(eventId),
      })
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'events',
      })
    },
  })

  function onSubmit(data: z.infer<typeof eventSchema>) {
    updateProductInEvent({
      product_list: selectedProducts,
    })
  }

  useEffect(() => {
    const productIdList = productsOfEvent.map((c) => ({ product_id: c.product_id }))
    setSelectedProducts(productIdList)
    form.setValue('product_list', productIdList)
  }, [productsOfEvent, form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4 py-4'>
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
                                    ? handleAddProduct(product.id)
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

function ProductsCard({ accountRole }: { accountRole: ROLE_TITLE }) {
  const router = useRouter()
  const { id: eventId } = useParams<{ id: string }>()
  const { data: eventDetails } = useQuery({
    queryKey: queryKeys.eventDetails.gen(eventId),
    queryFn: () => eventApi.getEventById(eventId),
  })
  const queryClient = useQueryClient()

  const productList =
    eventDetails?.product.map((c) => ({
      product_id: c.id,
    })) || []

  const { mutate: updateProductInEvent } = useMutation({
    mutationFn: (productId: string) =>
      eventApi.updateEvent(
        {
          product_list: productList.filter((c) => c.product_id !== productId),
        },
        eventId,
      ),
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.eventDetails.gen(eventId),
      })
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'events',
      })
    },
  })

  return (
    <ContentCard
      title='Products'
      hasButton={accountRole === ROLE_TITLE.ADMIN || accountRole === ROLE_TITLE.MANAGER}
      buttonName='Update Products'
      addContentSidebar={<UpdateProductInEvent eventId={eventId} productsOfEvent={productList} />}
    >
      <div className='flex flex-col rounded-sm border border-gray-200'>
        {eventDetails?.product.map((product, index) => (
          <div
            key={product.id}
            className={cn(
              'flex items-center justify-between p-4',
              index !== eventDetails?.product.length - 1 ? 'border-b border-b-gray-200' : '',
            )}
          >
            <span className='text-lg font-medium text-content'>{product.name}</span>
            <div className='flex items-center gap-2'>
              <Button
                className='size-[30px] rounded-[3px] bg-[#D4E0FF] p-[5px] hover:bg-[#D4E0FF]'
                onClick={() => router.push(`${PATH_NAME.PRODUCT}/${product.id}`)}
              >
                <Eye color='#336AEA' width={20} height={20} />
              </Button>
              <AlertPopup
                hidden={accountRole !== ROLE_TITLE.ADMIN && accountRole !== ROLE_TITLE.MANAGER}
                title='Delete?'
                description='Are you sure?'
                action={() => updateProductInEvent(product.id)}
              >
                <Button
                  className={cn(
                    'size-[30px] rounded-[3px] bg-[#FFD4D7] p-[5px] hover:bg-[#FFD4D7]',
                  )}
                >
                  <Trash2 color='#F23E14' />
                </Button>
              </AlertPopup>
            </div>
          </div>
        ))}
      </div>
    </ContentCard>
  )
}

export default ProductsCard
