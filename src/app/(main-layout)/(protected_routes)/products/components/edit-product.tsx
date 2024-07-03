'use client'

import { categoryApi, productApi } from '@/apis'
import { queryKeys } from '@/configs'
import { IProductRequest } from '@/interfaces/product'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/shared/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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

const categorySchema = z.object({
  category_id: z.string(),
})

const productSchema = z
  .object({
    name: z.string(),
    description: z.string().optional(),
    status: z.boolean(),
    list_price: z.string(),
    selling_price: z.string(),
    category_list: z.array(categorySchema),
  })
  .partial()

const status: string[] = [STATUS.ACTIVE, STATUS.INACTIVE]

export default function EditProductForm({ productId }: { productId: string }) {
  const queryClient = useQueryClient()

  const { data: product } = useQuery({
    queryKey: queryKeys.productDetails.gen(productId),
    queryFn: () => productApi.getProductById(productId),
  })

  const { data: categories, isPending } = useQuery({
    queryKey: queryKeys.allCategories,
    queryFn: () => categoryApi.getAllCategories(),
  })

  const [selectedCategories, setSelectedCategories] = useState<z.infer<typeof categorySchema>[]>([])
  const handleAddCategory = (categoryId: string) => {
    setSelectedCategories([...selectedCategories, { category_id: categoryId }])
  }
  const handleRemoveCategory = (categoryId: string) => {
    setSelectedCategories(selectedCategories.filter((c) => c.category_id !== categoryId))
  }

  const { mutate: editProduct } = useMutation({
    mutationFn: (data: IProductRequest) =>
      productApi.updateProduct(
        {
          name: data.name,
          description: data.description,
          status: data.status,
          list_price: data.list_price,
          selling_price: data.selling_price,
          category_list: data.category_list,
        },
        productId,
      ),
    onSuccess: () => {
      toast.success('Product updated successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'products',
      })
      await queryClient.invalidateQueries({ queryKey: queryKeys.productDetails.gen(productId) })
    },
  })

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      status: true,
      list_price: '0',
      selling_price: '0',
      category_list: [],
    },
  })

  function onSubmit(data: z.infer<typeof productSchema>) {
    editProduct({
      name: data.name,
      description: data.description,
      status: data.status,
      list_price: parseInt(data.list_price ?? '0'),
      selling_price: parseInt(data.selling_price ?? '0'),
      category_list: selectedCategories,
    })
  }

  useEffect(() => {
    if (!!product && !!product.category_list) {
      const categoryIdList = product.category_list.map((c) => ({ category_id: c.category.id }))
      setSelectedCategories(categoryIdList)
      form.setValue('category_list', categoryIdList)
    }
  }, [product, form])

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
                  <Input id='name' placeholder={product?.name} className='col-span-3' {...field} />
                </div>
              </FormControl>
              <FormMessage className='text-[16px] font-normal' />
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
                  <Input
                    id='description'
                    placeholder={product?.description}
                    className='col-span-3'
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className='text-[16px] font-normal' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='status'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='status' className='text-left'>
                    Status
                  </Label>
                  <div className='col-span-3'>
                    <ComboBox
                      key='status'
                      placeholder={product?.status ? STATUS.ACTIVE : STATUS.INACTIVE}
                      items={status}
                      onValueChange={(val) => {
                        field.value = val === STATUS.ACTIVE
                      }}
                    />
                  </div>
                </div>
              </FormControl>
              <FormMessage className='text-[16px] font-normal' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='list_price'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='list_price' className='text-left'>
                    L.Price
                  </Label>
                  <Input
                    id='list_price'
                    placeholder={product?.list_price}
                    className='col-span-3'
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className='text-[16px] font-normal' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='selling_price'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='selling_price' className='text-left'>
                    S.Price
                  </Label>
                  <Input
                    id='selling_price'
                    placeholder={product?.selling_price}
                    className='col-span-3'
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className='text-[16px] font-normal' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='category_list'
          render={({ field }) => (
            <FormItem>
              <Popover>
                <FormControl>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='category_list' className='text-left'>
                      Categories
                    </Label>
                    <PopoverTrigger asChild>
                      <Button variant='outline' className='col-span-3'>
                        Select
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='col-span-3' side='bottom'>
                      <ScrollArea className='h-44 w-full'>
                        {categories?.map((category) => (
                          <div key={category.id}>
                            <div className='flex items-center gap-2'>
                              <Checkbox
                                id={category.id}
                                checked={
                                  selectedCategories.findIndex(
                                    (c) => c.category_id === category.id,
                                  ) !== -1
                                }
                                onCheckedChange={(isChecked) =>
                                  isChecked
                                    ? handleAddCategory(category.id)
                                    : handleRemoveCategory(category.id)
                                }
                              />
                              <span className='text-sm leading-none'>
                                {category.name} - {category.gender}
                              </span>
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
          Edit Product
        </Button>
      </form>
    </Form>
  )
}
