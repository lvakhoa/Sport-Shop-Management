'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shared/card'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import { Id, toast } from 'react-toastify'
import { categoryApi } from '@/apis'
import { AlertPopup } from '@/components/shared'
import { SyntheticEvent, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { CONSUMER_TYPE } from '@/configs/enum'
import { ICategory } from '@/interfaces/category'

export interface ICategoryItem {
  id: string
  name: string
  image_url?: string
  is_active: boolean
  consumer_type: CONSUMER_TYPE
  child_categories: ICategory[]
  onClick?: () => void
  canEdit?: boolean
}

export function CategoryItem({
  id,
  name,
  image_url,
  consumer_type,
  child_categories,
  onClick,
  canEdit = false,
}: ICategoryItem) {
  const toastId = useRef<Id | undefined>()
  const queryClient = useQueryClient()

  const { mutate: deleteCategory, isPending } = useMutation({
    mutationFn: () => categoryApi.deleteCategoryById(id),
    onSuccess: () => {
      toast.success('Category deleted successfully')
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

  useEffect(() => {
    if (isPending) toastId.current = toast.loading('Loading...')

    return () => {
      toast.dismiss(toastId.current)
    }
  }, [isPending])

  return (
    <Card
      onClick={canEdit ? onClick : () => {}}
      className={cn('group flex flex-col rounded-lg shadow-md', canEdit ? 'cursor-pointer' : '')}
    >
      <CardHeader className='relative overflow-hidden p-0'>
        {canEdit && (
          <AlertPopup title='Delete?' description='Are you sure?' action={deleteCategory}>
            <div
              className={cn(
                'absolute -right-20 -top-20 size-20 rounded-full bg-[#f06444] p-2 duration-300 group-hover:-right-10 group-hover:-top-10',
                'sm:-right-32 sm:-top-32 sm:size-32 sm:group-hover:-right-16 sm:group-hover:-top-16',
              )}
            >
              <Trash2
                color='#fff'
                className={cn(
                  'size-4 sm:size-6',
                  'absolute bottom-7 left-7 duration-300 group-hover:bottom-4 group-hover:left-4',
                  'sm:bottom-14 sm:left-14 sm:group-hover:bottom-7 sm:group-hover:left-7',
                )}
              />
            </div>
          </AlertPopup>
        )}
        <Image
          className='!mt-0 pb-[16px]'
          src={
            image_url ||
            'https://res.cloudinary.com/dbpvh14wj/image/upload/f_auto,q_auto/pzi7bjxajmsgraesmjt2'
          }
          alt={name}
          layout='responsive'
          width={50}
          height={50}
        />
      </CardHeader>
      <CardContent>
        <div className='flex flex-col'>
          <CardTitle className='text-md sm:text-lg'>{name}</CardTitle>
          <CardDescription>
            {name} - {consumer_type}
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  )
}
