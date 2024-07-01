'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shared/card'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { categoryApi } from '@/apis'
import { AlertPopup } from '@/components/shared'
import { SyntheticEvent } from 'react'

export interface ICategoryItem {
  id: string
  name: string
  type: string
  gender: string
  image: string
  onClick?: () => void
}

export function CategoryItem({ id, name, type, gender, image, onClick }: ICategoryItem) {
  const queryClient = useQueryClient()

  const { mutate: deleteCategory } = useMutation({
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

  return (
    <Card
      onClick={onClick}
      className='group flex cursor-pointer flex-col justify-between rounded-none shadow-md'
    >
      <CardHeader className='relative overflow-hidden p-0'>
        <AlertPopup title='Delete?' description='Are you sure?' action={deleteCategory}>
          <div className='absolute -right-32 -top-32 size-32 rounded-full bg-[#f06444] p-2 duration-300 group-hover:-right-16 group-hover:-top-16'>
            <Trash2
              color='#fff'
              className='absolute bottom-14 left-14 duration-300 group-hover:bottom-7 group-hover:left-7'
            />
          </div>
        </AlertPopup>
        <Image
          className='!mt-0 pb-[16px]'
          src={
            image ||
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
            {type} - {gender}{' '}
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  )
}
