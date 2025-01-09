'use client'

import { useEffect, useState, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { PATH_NAME, queryKeys } from '@/configs'
import { categoryApi } from '@/apis'
import { Button } from '@/components/shared/button'
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shared/tabs'
import { CategoryItem, ICategoryItem } from './category-item'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { Id, toast } from 'react-toastify'
import { CONSUMER_TYPE, ROLE_NAME } from '@/configs/enum'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/shared/accordion'
import { set } from 'zod'

const consumerType = Object.values(CONSUMER_TYPE)

export default function CategoryBoard({ accountRole }: { accountRole: ROLE_NAME }) {
  const toastId = useRef<Id | undefined>()
  const router = useRouter()
  const [currentType, setCurrentType] = useState<CONSUMER_TYPE | undefined>(consumerType[0])
  const [currentCategoryName, setCurrentCategoryName] = useState<string | undefined>()
  const { isPending, data: categoriesData } = useQuery({
    queryKey: queryKeys.allCategories,
    queryFn: () => categoryApi.getAllCategories(undefined, undefined, currentType?.toString()),
  })

  const queryClient = useQueryClient()

  useEffect(() => {
    if (isPending) toastId.current = toast.loading('Loading...')

    return () => {
      toast.dismiss(toastId.current)
    }
  }, [isPending])

  const onCategoryChange = (type: ICategoryItem) => {
    setCurrentCategoryName(type.name)
    setCurrentCategoryItem(type)
    setCurrentType(type.consumer_type)
  }

  const categories: ICategoryItem[] =
    categoriesData?.map((category) => ({
      id: category.id,
      name: category.name,
      image_url: category.image_url,
      is_active: category.is_active,
      consumer_type: category.consumer_type,
      child_categories: category.child_categories,
    })) ?? []

  const [currentCategoryItem, setCurrentCategoryItem] = useState<ICategoryItem>(categories[0])

  return (
    <>
      {!isPending && (
        <div className='mx-[10px] flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 '>
          <div className='flex flex-col sm:w-1/5 sm:self-start'>
            <Tabs defaultValue={consumerType[0]}>
              <TabsList className='grid w-full grid-cols-3'>
                {consumerType.map((type) => (
                  <TabsTrigger
                    key={type}
                    value={type}
                    onClick={() => setCurrentType(type)}
                    className='px-4 py-2 text-center'
                  >
                    {type}
                  </TabsTrigger>
                ))}
              </TabsList>
              {consumerType.map((type) => (
                <TabsContent key={type} value={type}>
                  <Accordion type='single' collapsible={true}>
                    {categories
                      .filter((category) => category.consumer_type === type)
                      .map((category) => (
                        <AccordionItem key={category.id} value={category.id}>
                          <AccordionTrigger onClick={() => onCategoryChange(category)}>
                            <div className='flex items-center justify-between'>
                              <div className='flex items-center space-x-2'>
                                <p>{category.name}</p>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className='flex flex-col space-y-2'>
                              {category.child_categories.map((childCategory) => (
                                <div
                                  key={childCategory.id}
                                  className={cn(
                                    'flex cursor-pointer items-center rounded-lg px-[8px] py-[10px] sm:px-[10px] sm:py-[14px]',
                                    currentCategoryItem?.id === childCategory.id
                                      ? 'bg-blue-50'
                                      : 'bg-white hover:bg-blue-50',
                                  )}
                                  onClick={() => onCategoryChange(childCategory)}
                                >
                                  <a
                                    // href={link}
                                    className={cn(
                                      'flex h-full w-full items-center gap-[10px] max-[468px]:gap-[5px]',
                                      currentCategoryItem?.id === childCategory.id
                                        ? 'text-primary'
                                        : 'text-content',
                                    )}
                                  >
                                    <span className='text-[16px] font-medium'>
                                      {childCategory.name}
                                    </span>
                                  </a>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                  </Accordion>
                </TabsContent>
              ))}
            </Tabs>
          </div>
          <div className='flex flex-col sm:w-4/5'>
            {!isPending && currentCategoryItem && (
              <div className='grid grid-cols-3 gap-10 px-[10px] sm:max-w-full'>
                {categories
                  .filter(
                    (category) =>
                      currentCategoryItem?.name === category.name &&
                      category.consumer_type === currentType,
                  )
                  .map((category) => (
                    <CategoryItem
                      key={category.id}
                      id={category.id}
                      name={category.name}
                      consumer_type={category.consumer_type}
                      image_url={category.image_url}
                      child_categories={category.child_categories}
                      is_active={category.is_active}
                      onClick={() => router.push(`${PATH_NAME.CATEGORY}/edit/${category.id}`)}
                      canEdit={accountRole === ROLE_NAME.ADMIN}
                    />
                  ))}
                {categories
                  .filter(
                    (category) =>
                      currentCategoryItem?.name === category.name &&
                      category.consumer_type === currentType,
                  )
                  .map((category) =>
                    category.child_categories.map((childCategory) => (
                      <CategoryItem
                        key={childCategory.id}
                        id={childCategory.id}
                        name={childCategory.name}
                        consumer_type={childCategory.consumer_type}
                        image_url={childCategory.image_url}
                        child_categories={childCategory.child_categories}
                        is_active={childCategory.is_active}
                        onClick={() =>
                          router.push(`${PATH_NAME.CATEGORY}/edit/${childCategory.id}`)
                        }
                        canEdit={accountRole === ROLE_NAME.ADMIN}
                      />
                    )),
                  )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
