'use client'

import { colorApi, productApi, stockApi } from '@/apis'
import { queryKeys } from '@/configs'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shared/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/select'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Checkbox, ComboBox, Input, Label, ScrollArea } from '@/components/shared'
import { SIZE } from '@/configs/enum'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shared/popover'
import { IStockRequest } from '@/interfaces/stock'

const sizes: string[] = ['S', 'M', 'L', 'XL']
const stockSchema = z.object({
  product_id: z.string({ required_error: 'Product is required' }),
  color_id: z.string({ required_error: 'Color is required' }),
  size: z.enum(['S', 'M', 'L', 'XL'], { message: 'Size is required' }),
  quantity_in_stock: z.string({ required_error: 'Quantity is required' }),
  file: z
    .instanceof(File)
    .refine((file) => file.size < 7000000, {
      message: 'Your file must be less than 7MB.',
    })
    .optional(),
})

interface IColor {
  id: string
  name: string
}

interface IProduct {
  id: string
  name: string
}

export default function CreateStockForm() {
  const queryClient = useQueryClient()

  const { data: productData } = useQuery({
    queryKey: queryKeys.allProducts,
    queryFn: () => productApi.getAllProduct(),
  })

  const { data: colorData } = useQuery({
    queryKey: queryKeys.allColors,
    queryFn: () => colorApi.getAllColors(),
  })

  const colors: IColor[] = colorData?.map((c) => ({ id: c.id, name: c.name })) ?? []
  const products: IProduct[] = productData?.map((p) => ({ id: p.id, name: p.name })) ?? []

  const [selectedColorId, setSelectedColorId] = useState<string>()
  const [selectedProductId, setSelectedProductId] = useState<string>()

  const { mutate: createStock } = useMutation({
    mutationFn: (data: IStockRequest) =>
      stockApi.createStock({
        product_id: data.product_id,
        color_id: data.color_id,
        size: data.size,
        quantity_in_stock: data.quantity_in_stock,
        file: data.file,
      }),
    onSuccess: () => {
      toast.success('Stock updated successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'all-stocks',
      })
    },
  })

  const form = useForm<z.infer<typeof stockSchema>>({
    resolver: zodResolver(stockSchema),
  })

  function onSubmit(data: z.infer<typeof stockSchema>) {
    createStock({
      product_id: selectedProductId,
      color_id: selectedColorId,
      size: data.size as SIZE,
      quantity_in_stock: parseInt(data.quantity_in_stock),
      file: data.file,
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        encType='multipart/form-data'
        className='grid gap-4 py-4'
      >
        <FormField
          control={form.control}
          name='product_id'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <FormLabel>Product</FormLabel>
                  <div className='col-span-3'>
                    <Select
                      onValueChange={(value) => {
                        setSelectedProductId(value)
                        form.setValue('product_id', value)
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select Product' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {products?.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </FormControl>
              <FormMessage className='text-[16px] font-normal' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='color_id'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <FormLabel>Color</FormLabel>
                  <div className='col-span-3'>
                    <Select
                      onValueChange={(value) => {
                        setSelectedColorId(value)
                        form.setValue('color_id', value)
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select color' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {colors?.map((color) => (
                            <SelectItem key={color.id} value={color.id}>
                              {color.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </FormControl>
              <FormMessage className='text-[16px] font-normal' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='size'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <FormLabel>Size</FormLabel>
                  <div className='col-span-3'>
                    <ComboBox
                      key='size'
                      defaultValue={field.value}
                      placeholder='Size'
                      items={sizes}
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
          name='file'
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <FormLabel>File</FormLabel>
                  <Input
                    id='file'
                    className='col-span-3'
                    type='file'
                    {...fieldProps}
                    onChange={(event) => onChange(event.target.files && event.target.files[0])}
                  />
                </div>
              </FormControl>
              <FormMessage className='text-[14px] font-normal' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='quantity_in_stock'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <FormLabel>Quantity</FormLabel>
                  <Input type='number' id='quantity' className='col-span-3' {...field} />
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
          Create Stock
        </Button>
      </form>
    </Form>
  )
}
