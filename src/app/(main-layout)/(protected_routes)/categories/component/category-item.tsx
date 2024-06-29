'use client'

import { Button } from '@/components/shared'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shared/card'
import { currencyFormatter } from '@/helpers'
import { Label } from '@radix-ui/react-label'
import Image from 'next/image'
import { ReactElement } from 'react'

export interface ICategoryItem {
  id: string
  name: string
  type: string
  gender: string
  image: string
  onClick?: () => void
}

export function CategoryItem({ id, name, type, gender, image, onClick }: ICategoryItem) {
  return (
    <Card onClick={onClick} className='flex cursor-pointer flex-col justify-between shadow-md'>
      <CardHeader className='overflow-hidden p-0'>
        <Image
          className='rounded-lg pb-[16px]'
          src={image}
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
