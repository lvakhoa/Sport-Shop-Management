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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shared/popover'
import MultiSelect from '@/components/shared/multi-select'
import brandApi from '@/apis/brand'
import sportApi from '@/apis/sport'

const categorySchema = z.object({
  category_id: z.string(),
})

const productSchema = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    status: z.boolean().optional(),
    list_price: z.string().optional(),
    selling_price: z.string().optional(),
    category_list: z.array(categorySchema),
    weight: z.number().gte(0),
    brand_id: z.string(),
    sport_id: z.string(),
  })
  .partial()

export default function EditProductForm({ productId }: { productId: string }) {
  const queryClient = useQueryClient()

  const { data: product } = useQuery({
    queryKey: queryKeys.productDetails.gen(productId),
    queryFn: () => productApi.getProductById(productId),
  })

  const { data: categories } = useQuery({
    queryKey: queryKeys.allCategories,
    queryFn: () => categoryApi.getAllCategories(),
  })
  const allCategories =
    categories?.map((item) => ({
      value: item.id,
      label: item.name,
    })) ?? []
  const [selectedCategories, setSelectedCategories] = useState<{ value: string; label: string }[]>(
    [],
  )

  const { data: brands } = useQuery({
    queryKey: queryKeys.brands.gen(),
    queryFn: () => brandApi.getAllBrands(),
  })

  const { data: sports } = useQuery({
    queryKey: queryKeys.sports.gen(),
    queryFn: () => sportApi.getAllSports(),
  })

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
  })

  function onSubmit(data: z.infer<typeof productSchema>) {
    editProduct({
      name: data.name,
      description: data.description,
      status: data.status,
      list_price: parseInt(data.list_price ?? '0'),
      selling_price: parseInt(data.selling_price ?? '0'),
      category_list: selectedCategories.map((item) => ({ category_id: item.value })),
    })
  }

  useEffect(() => {
    if (!!product && !!product.categories) {
      const categoryIdList = product.categories.map((c) => ({ category_id: c.id }))
      setSelectedCategories(product.categories.map((c) => ({ value: c.id, label: c.name })))
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
                    placeholder={product?.list_price.toString()}
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
                    placeholder={product?.selling_price.toString()}
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
              <FormControl>
                <div className='flex items-center gap-4'>
                  <Label htmlFor='category_list' className='text-left'>
                    Categories
                  </Label>
                  <MultiSelect
                    menuHeight={160}
                    selectTitle='Select categories'
                    allItems={allCategories}
                    selectedItem={selectedCategories}
                    changeSelectedItem={setSelectedCategories}
                  />
                </div>
              </FormControl>
              <FormMessage className='text-[16px] font-normal' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='brand_id'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='brand_id' className='text-left'>
                    Brand
                  </Label>
                  <div className='col-span-3'>
                    <ComboBox
                      key='brand_id'
                      placeholder={brands?.find((b) => b.id === product?.brand.id)?.name ?? 'Brand'}
                      defaultValue={product?.brand.id}
                      items={brands?.map((b) => ({ value: b.id, label: b.name })) ?? []}
                      onValueChange={field.onChange}
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
          name='sport_id'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='sport_id' className='text-left'>
                    Sport
                  </Label>
                  <ComboBox
                    key='sport_id'
                    className='col-span-3'
                    placeholder={sports?.find((b) => b.id === product?.sport.id)?.name ?? 'Sport'}
                    items={sports?.map((b) => ({ value: b.id, label: b.name })) ?? []}
                    onValueChange={field.onChange}
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
          Edit Product
        </Button>
      </form>
    </Form>
  )
}
