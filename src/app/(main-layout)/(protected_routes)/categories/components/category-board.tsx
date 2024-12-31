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
import { CirclePlus, RotateCcw } from 'lucide-react'
import { RestorePopup } from '@/components/shared'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Id, toast } from 'react-toastify'
import moment from 'moment'
import { ROLE_NAME } from '@/configs/enum'

const gender: string[] = ['MALE', 'FEMALE']

export default function CategoryBoard({ accountRole }: { accountRole: ROLE_NAME }) {
  const toastId = useRef<Id | undefined>()
  const router = useRouter()
  const { isPending, data: categoriesData } = useQuery({
    queryKey: queryKeys.allCategories,
    queryFn: () => categoryApi.getAllCategories(),
  })

  const queryClient = useQueryClient()

  const { mutate: restore7daysData } = useMutation({
    mutationFn: () =>
      categoryApi.restoreCategory(moment().subtract(7, 'days').utc().unix().valueOf()),
    onSuccess: () => {
      toast.success('Data restored successfully')
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

  const { mutate: restore30daysData } = useMutation({
    mutationFn: () =>
      categoryApi.restoreCategory(moment().subtract(30, 'days').utc().unix().valueOf()),
    onSuccess: () => {
      toast.success('Data restored successfully')
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

  const { mutate: restoreAllData } = useMutation({
    mutationFn: () => categoryApi.restoreCategory(),
    onSuccess: () => {
      toast.success('Data restored successfully')
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

  const [typeList, setTypeList] = useState<string[]>([])

  useEffect(() => {
    const newtypeList = Array.from(
      new Set(categoriesData?.map((category) => category.consumer_type)),
    )
    setTypeList(newtypeList)
    setCurrentType(newtypeList[0])
  }, [categoriesData])

  useEffect(() => {
    if (isPending) toastId.current = toast.loading('Loading...')

    return () => {
      toast.dismiss(toastId.current)
    }
  }, [isPending])

  const [currentType, setCurrentType] = useState<string>(typeList[0])

  const onTypeChange = (type: string) => setCurrentType(type)

  const categories: ICategoryItem[] =
    categoriesData?.map((category) => ({
      id: category.id,
      name: category.name,
      type: category.consumer_type,
      gender: category.consumer_type,
      image: category.image_url ?? '',
    })) ?? []

  return (
    <div className='mx-[10px] flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 '>
      <div className='grid w-auto grid-cols-2 sm:w-1/5 sm:grid-cols-1 sm:self-start'>
        {typeList.map((item, index) => (
          <Button
            key={index}
            onClick={() => onTypeChange(item)}
            variant='ghost'
            className={cn(
              item === currentType
                ? 'bg-blue-50 hover:bg-blue-50'
                : 'bg-transparent hover:bg-muted',
              'justify-start sm:w-full',
            )}
          >
            {item}
          </Button>
        ))}
      </div>
      {!isPending && (
        <div className='flex-1 sm:max-w-full'>
          <Tabs defaultValue={gender[0]}>
            <div className='flex items-center justify-between px-[10px]'>
              <TabsList>
                {gender.map((item, index) => (
                  <TabsTrigger key={index} value={item}>
                    {item.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase())}
                  </TabsTrigger>
                ))}
                <TabsTrigger value='All'>All</TabsTrigger>
              </TabsList>

              {!isPending && (
                <div
                  className={cn(
                    'top-[calc(var(--header-height) + 20px)] flex gap-4',
                    accountRole !== ROLE_NAME.ADMIN ? 'hidden' : '',
                  )}
                >
                  <RestorePopup
                    title='Restore'
                    description='Select the duration to restore'
                    option1={restore7daysData}
                    option2={restore30daysData}
                    option3={restoreAllData}
                  >
                    <Button className='rounded-full bg-blue-500 px-4 py-2 font-normal text-white-100 hover:bg-blue-700'>
                      <RotateCcw size={22} className='sm:mr-2' />
                      <span className='hidden sm:inline'>Restore</span>
                    </Button>
                  </RestorePopup>
                  <Button
                    onClick={() => router.push(`${PATH_NAME.CATEGORY}/create`)}
                    className='rounded-full bg-blue-500 px-4 py-2 font-normal text-white-100 hover:bg-blue-700 '
                  >
                    <CirclePlus size={22} className='sm:mr-2' />
                    <span className='hidden sm:inline'>New Category</span>
                  </Button>
                </div>
              )}
            </div>

            {gender.map((item, index) => (
              <TabsContent key={index} value={item} className='grid grid-cols-3 gap-10 px-[10px]'>
                {categories
                  .filter((it) => it.type === currentType && it.gender === item)
                  .map((category) => (
                    <CategoryItem
                      key={category.id}
                      id={category.id}
                      name={category.name}
                      type={category.type}
                      gender={category.gender}
                      image={category.image}
                      onClick={() => router.push(`${PATH_NAME.CATEGORY}/edit/${category.id}`)}
                      canEdit={accountRole === ROLE_NAME.ADMIN}
                    />
                  ))}
              </TabsContent>
            ))}
            <TabsContent value='All' className='grid grid-cols-3 gap-10 px-[10px]'>
              {categories
                .filter((it) => it.type === currentType)
                .map((category, index) => (
                  <CategoryItem
                    key={index}
                    id={category.id}
                    name={category.name}
                    type={category.type}
                    gender={category.gender}
                    image={category.image}
                    onClick={() => router.push(`${PATH_NAME.CATEGORY}/edit/${category.id}`)}
                    canEdit={accountRole === ROLE_NAME.ADMIN}
                  />
                ))}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
