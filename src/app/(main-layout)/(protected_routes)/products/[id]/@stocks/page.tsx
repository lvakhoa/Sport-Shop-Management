'use client'

import { productApi } from '@/apis'
import { Button, ContentCard, Skeleton } from '@/components/shared'
import { Card, CardContent } from '@/components/shared/card'
import { PATH_NAME, queryKeys } from '@/configs'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = {}

function StocksPage({}: Props) {
  const router = useRouter()

  const { id: productId } = useParams<{ id: string }>()
  const { isPending, data: productDetails } = useQuery({
    queryKey: queryKeys.productDetails.gen(productId),
    queryFn: () => productApi.getProductById(productId),
  })

  const stockImages =
    !!productDetails && productDetails.stocks.length > 0
      ? productDetails.stocks
          .map((stock) => stock.media?.url ?? '')
          .filter((val, index, arr) => arr.indexOf(val) === index)
      : []
  const [selectedImage, setSelectedImage] = useState(0)

  const selectedColor = productDetails?.stocks.find(
    (s) => s.media?.url === stockImages[selectedImage],
  )?.color?.name

  const selectedStockSizes =
    !!productDetails && productDetails.stocks.length > 0
      ? productDetails.stocks
          .filter((s) => s.media?.url === stockImages[selectedImage] && !!s.size)
          .map((s) => s.size)
      : []
  const [selectedSize, setSelectedSize] = useState(0)

  const quantityInStock = productDetails?.stocks.find(
    (s) =>
      s.media?.url === stockImages[selectedImage] &&
      (!s.size || s.size === selectedStockSizes[selectedSize]),
  )?.quantity_in_stock

  const selectedStockId = productDetails?.stocks.find(
    (s) => s.color?.name === selectedColor && s.size === selectedStockSizes[selectedSize],
  )?.id

  if (!!productDetails && productDetails.stocks.length <= 0) {
    return 'Product has no stocks'
  }

  return (
    <ContentCard>
      <div className='flex max-w-[620px] flex-col-reverse gap-3 sm:flex-row sm:gap-5'>
        <div className='flex max-w-[90px] flex-row gap-3 sm:flex-col sm:gap-5'>
          {stockImages.map((url, index) => (
            <Card
              key={url}
              className='relative h-16 w-[90px] cursor-pointer rounded-2xl sm:h-20'
              onClick={() => setSelectedImage(index)}
            >
              <CardContent>
                {isPending ? (
                  <Skeleton className='absolute left-0 top-0 flex h-16 w-[90px] items-center justify-center rounded-2xl bg-gray-300 sm:h-20'>
                    <svg
                      className='size-6 text-gray-200 dark:text-gray-600'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 20 18'
                    >
                      <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
                    </svg>
                  </Skeleton>
                ) : (
                  <Image
                    objectFit='cover'
                    fill
                    src={url}
                    alt=''
                    className='h-16 w-[90px] rounded-2xl sm:h-20'
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className='flex w-full gap-3 sm:gap-5'>
          <Card className='relative h-96 w-full rounded-2xl sm:h-[480px]'>
            <CardContent>
              {isPending ? (
                <Skeleton className='absolute left-0 top-0 flex h-96 w-full items-center justify-center rounded-2xl bg-gray-300 sm:h-[480px]'>
                  <svg
                    className='size-10 text-gray-200 dark:text-gray-600'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 20 18'
                  >
                    <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
                  </svg>
                </Skeleton>
              ) : (
                <Image
                  objectFit='cover'
                  fill
                  src={stockImages[selectedImage]}
                  alt=''
                  className='h-96 w-full rounded-2xl sm:h-[480px]'
                />
              )}
            </CardContent>
          </Card>

          <div className='flex flex-col gap-5'>
            <div className='flex flex-col items-start gap-2 sm:flex-row sm:items-center'>
              <span className='text-sm font-semibold uppercase sm:text-base'>Color</span>
              <span className='text-sm font-medium text-heading'>
                {selectedColor?.replace(selectedColor[0], selectedColor[0].toUpperCase()) ?? ''}
              </span>
            </div>

            {selectedStockSizes.length > 0 && (
              <div className='flex flex-col gap-1'>
                <span className='text-sm font-semibold uppercase sm:text-base'>Size</span>
                <div className='flex flex-col gap-2 sm:flex-row sm:gap-3'>
                  {selectedStockSizes.map((size, index) => (
                    <div
                      key={size}
                      className={cn(
                        'flex size-8 cursor-pointer items-center justify-center rounded-lg',
                        selectedSize === index
                          ? 'border-2 border-primary'
                          : 'border border-black-75 duration-300 hover:border-primary',
                      )}
                      onClick={() => setSelectedSize(index)}
                    >
                      <span className='text-sm font-medium text-heading'>{size ?? ''}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className='flex flex-col items-start gap-2 sm:flex-row sm:items-center'>
              <span className='text-sm font-semibold uppercase sm:text-base'>Quantity</span>
              <span className='text-sm font-medium text-heading'>{quantityInStock ?? 0}</span>
            </div>

            <Button
              className='p-4'
              onClick={() => router.push(`${PATH_NAME.STOCK}/${selectedStockId ?? ''}`)}
            >
              Go to details
            </Button>
          </div>
        </div>
      </div>
    </ContentCard>
  )
}

export default StocksPage
