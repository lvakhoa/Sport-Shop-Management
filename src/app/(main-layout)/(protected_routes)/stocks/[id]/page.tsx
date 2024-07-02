'use client'

import { useParams, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { PATH_NAME, queryKeys } from '@/configs'
import { stockApi } from '@/apis'
import { SIZE } from '@/configs/enum'
import { ContentCard, Breadcrumb, Button, Skeleton } from '@/components/shared'
import styles from '@/components/shared/ContentCard/ContentCard.module.css'
import { currencyFormatter, colorFormatter } from '@/helpers'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface IStockInfo {
  id: string
  product_id: string
  product: {
    name: string
    list_price: string
    selling_price: string
  }
  media: {
    url: string
  }
  size: SIZE
  color: string
  quantity_in_stock: number
}
const breadcrumbItems = [
  {
    name: 'Stocks',
    link: PATH_NAME.STOCK,
  },
]

export default function StockDetailPage() {
  const router = useRouter()
  const { id: stockId } = useParams<{ id: string }>()
  const { isPending, data } = useQuery({
    queryKey: queryKeys.stockDetails.gen(stockId),
    queryFn: () => stockApi.getStockById(stockId),
  })

  const details: IStockInfo = {
    id: data?.id ?? '',
    product_id: data?.product_id ?? '',
    product: {
      name: data?.product.name ?? '',
      list_price: currencyFormatter(Number(data?.product?.list_price ?? 0)),
      selling_price: currencyFormatter(Number(data?.product?.selling_price ?? 0)),
    },
    media: {
      url: data?.media?.url ?? '',
    },
    size: data?.size ?? SIZE.S,
    color: colorFormatter(data?.color.name ?? ''),
    quantity_in_stock: data?.quantity_in_stock ?? 0,
  }
  return (
    <div className='mx-6 my-4'>
      <Breadcrumb items={breadcrumbItems} page='View' className='mb-6' textSize={22} />
      <div>
        <ContentCard title='Information'>
          <div className='grid grid-cols-3 gap-4'>
            {isPending ? (
              <Skeleton className='relative left-0 top-0 flex size-full items-center justify-center rounded-2xl bg-gray-300'>
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
              <div className='flex flex-col items-center gap-4'>
                <Image
                  alt=''
                  className='rounded-2xl'
                  layout='responsive'
                  width={100}
                  height={100}
                  src={
                    details.media?.url ||
                    'https://res.cloudinary.com/dbpvh14wj/image/upload/f_auto,q_auto/pzi7bjxajmsgraesmjt2'
                  }
                />
                <div>
                  <Button
                    className='p-4'
                    onClick={() => router.push(`${PATH_NAME.PRODUCT}/${details.product_id ?? ''}`)}
                  >
                    View product details
                  </Button>
                </div>
              </div>
            )}
            <div className='flex gap-10'>
              <div className={cn(styles.list)}>
                <span className={styles.info_title}>Product Name</span>
                <span className={styles.info_title}>Size</span>
                <span className={styles.info_title}>Color</span>
                <span className={styles.info_title}>Quantity</span>
                <span className={styles.info_title}>List Price</span>
                <span className={styles.info_title}>Selling Price</span>
              </div>
              {isPending ? (
                <div className='flex flex-col justify-between'>
                  <Skeleton className='h-3.5 w-[100px]' />
                  <Skeleton className='h-3.5 w-[100px]' />
                  <Skeleton className='h-3.5 w-[100px]' />
                  <Skeleton className='h-3.5 w-[100px]' />
                  <Skeleton className='h-3.5 w-[100px]' />
                  <Skeleton className='h-3.5 w-[100px]' />
                </div>
              ) : (
                <div className={styles.list}>
                  <span className={styles.info_content}>{details.product.name}</span>
                  <span className={styles.info_content}>{details.size}</span>
                  <div className='flex items-center'>
                    <div
                      className='size-6 rounded-sm'
                      style={{
                        backgroundColor: details.color,
                      }}
                    />
                  </div>
                  <span className={styles.info_content}>{details.quantity_in_stock}</span>
                  <span className={styles.info_content}>{details.product.list_price}</span>
                  <span className={styles.info_content}>{details.product.selling_price}</span>
                </div>
              )}
            </div>
          </div>
        </ContentCard>
      </div>
    </div>
  )
}
