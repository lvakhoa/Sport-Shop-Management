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
import { Trash2 } from 'lucide-react'

const gender: string[] = ['MALE', 'FEMALE']

const productListSchema = z.object({
  product_id: z.string(),
})

const formSchema = z.object({
  name: z.string().optional(),
  type: z.string().optional(),
  gender: z.enum(['MALE', 'FEMALE']).optional(),
  description: z.string().optional(),
  product_list: z.array(productListSchema).nullable(),
  file: z
    .instanceof(File)
    .refine((file) => file.size < 7000000, {
      message: 'Your file must be less than 7MB.',
    })
    .optional(),
})

const breadcrumbItems = [
  {
    name: 'Catergories',
    link: PATH_NAME.CATEGORY,
  },
]

export default function EditCategoryPage() {
  const { id: categoryId } = useParams<{ id: string }>()
  const router = useRouter()
  const { data: categoryData } = useQuery({
    queryKey: queryKeys.categoryDetails.gen(categoryId),
    queryFn: () => categoryApi.getCategoryById(categoryId),
  })

  const { data: products } = useQuery({
    queryKey: queryKeys.allProducts,
    queryFn: () => productApi.getAllProduct(),
  })

  const { isPending, data: categoriesData } = useQuery({
    queryKey: queryKeys.allCategories,
    queryFn: () => categoryApi.getAllCategories(),
  })

  const typeList = Array.from(new Set(categoriesData?.map((category) => category.type)))

  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const { mutate: editCategory } = useMutation({
    mutationFn: (data: ICategoryRequest) =>
      categoryApi.updateCategory(
        {
          name: data.name,
          type: data.type,
          gender: data.gender,
          description: data.description,
          product_list: data.product_list,
          file: data.file,
        },
        categoryId,
      ),
    onSuccess: () => {
      toast.success('Category updated successfully')
      router.push(PATH_NAME.CATEGORY)
    },
    onError: (error) => {
      toast.error(error.message)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'all-categories',
      })
      await queryClient.invalidateQueries({ queryKey: queryKeys.categoryDetails.gen(categoryId) })
    },
  })

  const { mutate: deleteCategory } = useMutation({
    mutationFn: () => categoryApi.deleteCategoryById(categoryId),
    onSuccess: () => {
      toast.success('Category deleted successfully')
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
    editCategory({
      name: data.name,
      type: data.type,
      gender: data.gender,
      description: data.description,
      product_list: selectedProducts,
      file: data.file,
    })
  }

  const [selectedProducts, setSelectedProducts] = useState<z.infer<typeof productListSchema>[]>([])
  const [selectedType, setSelectedType] = useState<string>()

  const handleAddProduct = (productId: string) => {
    setSelectedProducts([...selectedProducts, { product_id: productId }])
  }
  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter((c) => c.product_id !== productId))
  }

  useEffect(() => {
    if (!!categoryData) {
      form.setValue(
        'product_list',
        categoryData.product_list.map((item) => ({
          product_id: item.product.id,
        })) ?? [],
      )
      setSelectedProducts(
        categoryData.product_list.map((item) => ({ product_id: item.product.id })) ?? [],
      )
    }
  }, [categoryData, form])

  useEffect(() => {
    setSelectedType(form.getValues('type'))
  }, [form])

  return (
    <div>
      <div className='mx-6 my-4'>
        <Breadcrumb items={breadcrumbItems} page='Edit' className='mb-6' textSize={22} />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-2 gap-4 py-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className='flex flex-col gap-4'>
                        <FormLabel>Name</FormLabel>
                        <Input
                          id='name'
                          placeholder={categoryData ? categoryData.name : ''}
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
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className='flex flex-col gap-4'>
                        <FormLabel>Type</FormLabel>
                        <div className='flex gap-2'>
                          <Input
                            id='type'
                            placeholder='Type'
                            className='col-span-3'
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              setSelectedType(e.target.value)
                              form.setValue('type', e.target.value)
                            }}
                          />
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant='outline'>Select</Button>
                            </PopoverTrigger>
                            <PopoverContent className='grid gap-4' side='bottom'>
                              <ScrollArea className='h-[200px] w-full'>
                                {typeList.map((type) => (
                                  <div key={type} className='flex items-center gap-4 py-[5px]'>
                                    <span
                                      className={`${
                                        selectedType === type ? 'bg-blue-50' : 'bg-transparent'
                                      } w-full cursor-pointer rounded-md px-2 py-1`}
                                      onClick={() => {
                                        setSelectedType(type)
                                        form.setValue('type', type)
                                      }}
                                    >
                                      {type}
                                    </span>
                                  </div>
                                ))}
                              </ScrollArea>
                            </PopoverContent>
                          </Popover>
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
                            placeholder={categoryData ? categoryData.gender : 'MALE'}
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
                Edit Category
              </Button>
              <AlertPopup title='Delete?' description='Are you sure?' action={deleteCategory}>
                <Button variant='destructive' className='my-6 items-center gap-[5px]'>
                  <Trash2 width={20} height={20} />
                  <span className='text-[15px]'>Delete Category</span>
                </Button>
              </AlertPopup>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
