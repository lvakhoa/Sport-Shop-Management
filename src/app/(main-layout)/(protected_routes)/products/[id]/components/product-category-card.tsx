'use client'

import { categoryApi, productApi } from '@/apis'
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
import { IProductRequest } from '@/interfaces/product'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/shared/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shared/popover'
import { ROLE_TITLE } from '@/configs/enum'

const categorySchema = z.object({
  category_id: z.string().min(1, {
    message: 'Category id is required',
  }),
})

const productSchema = z.object({
  category_list: z.array(categorySchema),
})

function UpdateCategoryInProduct({
  productId,
  categoriesOfProduct,
}: {
  productId: string
  categoriesOfProduct: z.infer<typeof categorySchema>[]
}) {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category_list: [],
    },
  })
  const queryClient = useQueryClient()

  const { data: categories } = useQuery({
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

  const { mutate: updateCategoryInProduct } = useMutation({
    mutationFn: (data: IProductRequest) =>
      productApi.updateProduct(
        {
          category_list: data.category_list,
        },
        productId,
      ),
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.productDetails.gen(productId),
      })
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'products',
      })
    },
  })

  function onSubmit(data: z.infer<typeof productSchema>) {
    updateCategoryInProduct({
      category_list: selectedCategories,
    })
  }

  useEffect(() => {
    const categoryIdList = categoriesOfProduct.map((c) => ({ category_id: c.category_id }))
    setSelectedCategories(categoryIdList)
    form.setValue('category_list', categoryIdList)
  }, [categoriesOfProduct, form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4 py-4'>
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

function CategoryCard({ accountRole }: { accountRole: ROLE_TITLE }) {
  const router = useRouter()
  const { id: productId } = useParams<{ id: string }>()
  const { data: productDetails } = useQuery({
    queryKey: queryKeys.productDetails.gen(productId),
    queryFn: () => productApi.getProductById(productId),
  })
  const queryClient = useQueryClient()

  const categoryList = !!productDetails
    ? productDetails.category_list.map((c) => ({
        category_id: c.category.id,
      }))
    : []

  const { mutate: updateCategoryInProduct } = useMutation({
    mutationFn: (categoryId: string) =>
      productApi.updateProduct(
        {
          category_list: categoryList.filter((c) => c.category_id !== categoryId),
        },
        productId,
      ),
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.productDetails.gen(productId),
      })
      await queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'products',
      })
    },
  })

  return (
    <ContentCard
      title='Categories'
      hasButton={accountRole === ROLE_TITLE.ADMIN || accountRole === ROLE_TITLE.MANAGER}
      buttonName='Update Categories'
      addContentSidebar={
        <UpdateCategoryInProduct productId={productId} categoriesOfProduct={categoryList} />
      }
    >
      <div className='flex flex-col rounded-sm border border-gray-200'>
        {productDetails?.category_list.map(({ category }, index) => (
          <div
            key={category.id}
            className={cn(
              'flex items-center justify-between p-4',
              index !== productDetails?.category_list.length - 1
                ? 'border-b border-b-gray-200'
                : '',
            )}
          >
            <span className='text-lg font-medium text-content'>{category.name}</span>
            <div className='flex items-center gap-2'>
              {/* <Button
                className='size-[30px] rounded-[3px] bg-[#D4E0FF] p-[5px] hover:bg-[#D4E0FF]'
                onClick={() => router.push(`${PATH_NAME.CATEGORY}/${category.id}`)}
              >
                <Eye color='#336AEA' width={20} height={20} />
              </Button> */}
              <AlertPopup
                hidden={accountRole !== ROLE_TITLE.ADMIN && accountRole !== ROLE_TITLE.MANAGER}
                title='Delete?'
                description='Are you sure?'
                action={() => updateCategoryInProduct(category.id)}
              >
                <Button
                  className={cn(
                    'h-[30px] w-[30px] rounded-[3px] bg-[#FFD4D7] p-[5px] hover:bg-[#FFD4D7]',
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

export default CategoryCard
