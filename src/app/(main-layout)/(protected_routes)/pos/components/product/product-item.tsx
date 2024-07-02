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

export interface IProductItem {
  stock_id?: string
  name: string
  price: number
  image?: string
  color?: string
  size?: string
  quantity?: number
  onClick?: () => void
}

export function ProductItem({ name, price, image, onClick }: IProductItem) {
  return (
    <Card onClick={onClick} className='cursor-pointer shadow-md'>
      <CardHeader className='overflow-hidden p-0'>
        <Image
          className='rounded-lg pb-[16px]'
          src={
            image ??
            'https://res.cloudinary.com/dbpvh14wj/image/upload/f_auto,q_auto/pzi7bjxajmsgraesmjt2'
          }
          alt={name}
          layout='responsive'
          width={69}
          height={69}
        />
      </CardHeader>
      <CardContent>
        <div className='flex flex-col'>
          <CardTitle className='text-md sm:text-lg'>{name}</CardTitle>
          <CardDescription>{currencyFormatter(price)}</CardDescription>
        </div>
      </CardContent>
    </Card>
  )
}
