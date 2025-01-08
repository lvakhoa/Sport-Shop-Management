'use client'

import { productApi, stockApi } from '@/apis'
import { queryKeys } from '@/configs'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
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
const stockSchema = z
  .object({
    name: z.string(),
    product_id: z.string(),
    color: z.string(),
    size: z.nativeEnum(SIZE),
    quantity: z.number(),
    file: z.instanceof(File).refine((file) => file.size < 7000000, {
      message: 'Your file must be less than 7MB.',
    }),
  })
  .partial()

interface IColor {
  id: string
  name: string
}

interface IProduct {
  id: string
  name: string
}

export default function EditStockForm({ stockId }: { stockId: string }) {
  const queryClient = useQueryClient()

  const { data: stock } = useQuery({
    queryKey: queryKeys.stockDetails.gen(stockId),
    queryFn: () => stockApi.getStockById(stockId),
  })

  const { data: productData } = useQuery({
    queryKey: queryKeys.allProducts,
    queryFn: () => productApi.getAllProduct(),
  })

  const products: IProduct[] = productData?.map((p) => ({ id: p.id, name: p.name })) ?? []

  const [selectedColor, setSelectedColor] = useState<string>('')
  const [selectedProductId, setSelectedProductId] = useState<string>('')

  const { mutate: editStock } = useMutation({
    mutationFn: (data: IStockRequest) =>
      stockApi.updateStock(
        {
          name: data.name,
          product_id: data.product_id,
          color: data.color,
          size: data.size as SIZE,
          quantity: data.quantity,
          file: data.file,
        },
        stockId,
      ),
    onSuccess: () => {
      toast.success('Stock updated successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'stocks',
      })
      await queryClient.invalidateQueries({ queryKey: queryKeys.stockDetails.gen(stockId) })
    },
  })

  const form = useForm<z.infer<typeof stockSchema>>({
    resolver: zodResolver(stockSchema),
  })

  function onSubmit(data: z.infer<typeof stockSchema>) {
    editStock({
      name: data.name ?? '',
      product_id: selectedProductId,
      color: selectedColor,
      size: data.size,
      quantity: data.quantity,
      file: data.file,
    })
  }

  useEffect(() => {
    if (!!stock) {
      setSelectedColor(stock.color)
      setSelectedProductId(stock.product.id)
      form.setValue('quantity', stock.quantity)
      form.setValue('size', stock.size)
      form.setValue('product_id', stock.product.id)
      form.setValue('color', stock.color)
      form.setValue('name', stock.name)
    }
  }, [form, stock])

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
                        <SelectValue
                          placeholder={
                            products.find((product) => product.id === selectedProductId)?.name
                          }
                        />
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

        {/* <FormField
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
                        <SelectValue
                          placeholder={colors.find((color) => color.id === selectedColorId)?.name}
                        />
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
        /> */}

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
                      placeholder={!!stock?.size ? stock.size : ''}
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
          name='quantity'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <FormLabel>Quantity</FormLabel>
                  <Input
                    id='quantity'
                    placeholder={stock?.quantity.toString()}
                    className='col-span-3'
                    {...field}
                  />
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
          Edit Stock
        </Button>
      </form>
    </Form>
  )
}
