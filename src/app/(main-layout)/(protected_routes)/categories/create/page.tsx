'use client'
import { useParams, useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { PATH_NAME, queryKeys } from '@/configs'
import { categoryApi, productApi } from '@/apis'
import { Breadcrumb, Input, ComboBox, ScrollArea, Checkbox, AlertPopup } from '@/components/shared'
import { Button } from '@/components/shared/button'
import { Textarea } from '@/components/shared/text-area'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from '@/components/shared/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shared/popover'
import { ICategoryRequest } from '@/interfaces/category'

const gender: string[] = ['MALE', 'FEMALE']

const productListSchema = z.object({
  product_id: z.string(),
})

const formSchema = z.object({
  name: z.string(),
  type: z.string(),
  gender: z.enum(['MALE', 'FEMALE']),
  description: z.string(),
  product_list: z.array(productListSchema).nullable(),
  file: z.instanceof(File).refine((file) => file.size < 7000000, {
    message: 'Your file must be less than 7MB.',
  }),
})

const breadcrumbItems = [
  {
    name: 'Catergories',
    link: PATH_NAME.CATEGORY,
  },
]

export default function CreateCategoryPage() {
  const router = useRouter()
  const { data: products } = useQuery({
    queryKey: queryKeys.allProducts,
    queryFn: () => productApi.getAllProduct(),
  })

  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const { mutate: createCategory } = useMutation({
    mutationFn: (data: ICategoryRequest) =>
      categoryApi.createCategory({
        name: data.name,
        type: data.type,
        gender: data.gender,
        description: data.description,
        product_list: data.product_list,
        file: data.file,
      }),
    onSuccess: () => {
      toast.success('Category created successfully')
      router.push(PATH_NAME.CATEGORY)
    },
    onError: (error) => {
      toast.error(error.message)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'all-categories',
      })
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    createCategory({
      name: data.name,
      type: data.type,
      gender: data.gender,
      description: data.description,
      product_list: selectedProducts,
      file: data.file,
    })
  }

  const [selectedProducts, setSelectedProducts] = useState<z.infer<typeof productListSchema>[]>([])
  const handleAddProduct = (productId: string) => {
    setSelectedProducts([...selectedProducts, { product_id: productId }])
  }
  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter((c) => c.product_id !== productId))
  }

  useEffect(() => {
    form.setValue(
      'product_list',
      selectedProducts.map((product) => ({ product_id: product.product_id })),
    )
  }, [selectedProducts, form])

  return (
    <div>
      <div className='mx-6 my-4'>
        <Breadcrumb items={breadcrumbItems} page='Create' className='mb-6' textSize={22} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} encType='multipart/form-data'>
            <div className='grid grid-cols-2 gap-4 py-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className='flex flex-col gap-4'>
                        <FormLabel>Name</FormLabel>
                        <Input id='name' placeholder='Name' className='col-span-3' {...field} />
                      </div>
                    </FormControl>
                    <FormMessage className='text-[14px] font-normal' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className='flex flex-col gap-4'>
                        <FormLabel>Type</FormLabel>
                        <Input id='type' placeholder='Type' className='col-span-3' {...field} />
                      </div>
                    </FormControl>
                    <FormMessage className='text-[14px] font-normal' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='file'
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormControl>
                      <div className='flex flex-col gap-4'>
                        <FormLabel>File</FormLabel>
                        <Input
                          id='file'
                          className='col-span-3'
                          type='file'
                          {...fieldProps}
                          onChange={(event) =>
                            onChange(event.target.files && event.target.files[0])
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage className='text-[14px] font-normal' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='gender'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className='flex flex-col gap-4'>
                        <FormLabel>Gender</FormLabel>
                        <div className='col-span-3'>
                          <ComboBox
                            key='gender'
                            defaultValue={field.value}
                            placeholder='Gender'
                            items={gender}
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
                name='product_list'
                render={({ field }) => (
                  <FormItem>
                    <Popover>
                      <FormControl>
                        <div className='flex flex-col gap-4'>
                          <FormLabel>Products list</FormLabel>
                          <div>
                            <PopoverTrigger asChild>
                              <Button variant='outline'>Select</Button>
                            </PopoverTrigger>
                          </div>
                          <PopoverContent className='grid gap-4' side='bottom'>
                            <ScrollArea className='h-[200px] w-full'>
                              {products?.map((product) => (
                                <div key={product.id} className='flex items-center gap-4 py-[5px]'>
                                  <Checkbox
                                    id={product.id}
                                    checked={selectedProducts.some(
                                      (c) => c.product_id === product.id,
                                    )}
                                    onCheckedChange={(isChecked) =>
                                      isChecked
                                        ? handleAddProduct(product.id)
                                        : handleRemoveProduct(product.id)
                                    }
                                  />
                                  <span className='text-sm leading-none'>{product.name}</span>
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
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Write something...'
                        className='resize-none'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
            </div>
            <div className='flex items-center gap-4'>
              <Button
                type='submit'
                className='flex gap-[5px] bg-secondary duration-300 hover:bg-[#739AF4]'
              >
                Create Category
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
