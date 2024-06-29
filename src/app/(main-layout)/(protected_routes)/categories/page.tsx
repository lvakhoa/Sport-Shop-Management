'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { PATH_NAME, queryKeys } from '@/configs'
import { categoryApi } from '@/apis'
import { Button } from '@/components/shared/button'
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shared/tabs'
import { CategoryItem, ICategoryItem } from './component/category-item'
import { useRouter } from 'next/navigation'
import { CirclePlus } from 'lucide-react'

const gender: string[] = ['MALE', 'FEMALE']

export default function CategoriesPage() {
  const router = useRouter()
  const { isPending, data: categoriesData } = useQuery({
    queryKey: queryKeys.allCategories,
    queryFn: () => categoryApi.getAllCategories(),
  })

  const [typeList, setTypeList] = useState<string[]>([])

  useEffect(() => {
    const newtypeList = Array.from(new Set(categoriesData?.map((category) => category.type)))
    setTypeList(newtypeList)
    setCurrentType(newtypeList[0])
  }, [categoriesData])

  const [currentType, setCurrentType] = useState<string>(typeList[0])

  const onTypeChange = (type: string) => setCurrentType(type)

  const categories: ICategoryItem[] =
    categoriesData?.map((category) => ({
      id: category.id,
      name: category.name,
      type: category.type,
      gender: category.gender,
      image: category.media?.url || '',
    })) ?? []

  return (
    <div className='mx-[10px] flex flex-col space-y-4 min-[1100px]:flex-row min-[1100px]:space-x-4 min-[1100px]:space-y-0 '>
      <div className='min-[1100px]:w-1/5'>
        {typeList.map((item, index) => (
          <Button
            key={index}
            onClick={() => onTypeChange(item)}
            variant='ghost'
            className={cn(
              item === currentType
                ? 'bg-blue-50 hover:bg-blue-50'
                : 'bg-transparent hover:bg-muted',
              'justify-start min-[1100px]:w-full',
            )}
          >
            {item}
          </Button>
        ))}
      </div>
      {!isPending && (
        <div className='flex-1 min-[1100px]:max-w-full'>
          <Tabs defaultValue={gender[0]}>
            <TabsList>
              {gender.map((item, index) => (
                <TabsTrigger key={index} value={item}>
                  {item.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase())}
                </TabsTrigger>
              ))}
              <TabsTrigger value='All'>All</TabsTrigger>
            </TabsList>
            {gender.map((item, index) => (
              <TabsContent key={index} value={item} className='grid grid-cols-3 gap-10 px-[10px]'>
                {categories
                  .filter((it) => it.type === currentType && it.gender === item)
                  .map((category, index) => (
                    <CategoryItem
                      key={index}
                      id={category.id}
                      name={category.name}
                      type={category.type}
                      gender={category.gender}
                      image={category.image}
                      onClick={() => router.push(`${PATH_NAME.CATEGORY}/edit/${category.id}`)}
                    />
                  ))}
              </TabsContent>
            ))}
            <TabsContent value='All' className='grid grid-cols-3 gap-10 pb-[10px]'>
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
                  />
                ))}
            </TabsContent>
          </Tabs>
        </div>
      )}

      {!isPending && (
        <Button
          onClick={() => router.push(`${PATH_NAME.CATEGORY}/create`)}
          className='top-[calc(var(--header-height) + 20px)] fixed right-[20px] rounded-full bg-blue-500 px-4 py-2 font-bold text-white-100 hover:bg-blue-700'
        >
          <CirclePlus size={24} className='mr-2' />
          New Category
        </Button>
      )}
    </div>
  )
}
