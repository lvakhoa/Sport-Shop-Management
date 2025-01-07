'use client'

import { productApi } from '@/apis'
import { ContentCard } from '@/components/shared'
import { queryKeys } from '@/configs'
import { colorFormatter, currencyFormatter } from '@/helpers'
import { useQuery } from '@tanstack/react-query'
import { notFound, useParams } from 'next/navigation'
import styles from '@/components/shared/ContentCard/ContentCard.module.css'

interface IProductInfo {
  name: string
  description?: string
  listPrice: string
  sellingPrice: string
  color: string[]
  size: string
  categories: string
  totalQuantity: number
  brand: string
  sport: string
}

function InformationPage() {
  const { id: productId } = useParams<{ id: string }>()
  const { data } = useQuery({
    queryKey: queryKeys.productDetails.gen(productId),
    queryFn: () => productApi.getProductById(productId),
    throwOnError(error, query) {
      notFound()
    },
  })

  const details: IProductInfo = {
    name: data?.name ?? '',
    description: data?.description,
    listPrice: currencyFormatter(Number(data?.list_price ?? 0)),
    sellingPrice: currencyFormatter(Number(data?.selling_price ?? 0)),
    color: !!data && data.stocks.length > 0 ? data?.stocks.map((item) => item.color) : [],
    size:
      !!data && data.stocks.length > 0
        ? data?.stocks.map((item) => item.size ?? '').join(', ')
        : '',
    brand: data?.brand.name ?? '',
    sport: data?.sport.name ?? '',
    categories:
      !!data && !!data.categories && data.categories.length > 0
        ? data.categories
            .map((item) => item.name ?? '')
            .slice(0, 2)
            .join(', ') + (data.categories.length > 2 ? ', ...' : '')
        : '',
    totalQuantity:
      !!data && data.stocks.length > 0
        ? data?.stocks.reduce((acc, item) => acc + item.quantity, 0)
        : 0,
  }

  return (
    <ContentCard title='Information'>
      <div className='mb-6 flex flex-col gap-y-2 sm:flex-row sm:gap-20 md:gap-32'>
        <div className='flex min-w-[260px] gap-10'>
          <div className={styles.list}>
            <span className={styles.info_title}>Name</span>
            <span className={styles.info_title}>Categories</span>
            <span className={styles.info_title}>Colors</span>
            <span className={styles.info_title}>Sizes</span>
          </div>
          <div className={styles.list}>
            <span className={styles.info_content}>{details.name}</span>
            <span className={styles.info_content}>{details.categories}</span>
            <div className='flex items-center gap-2'>
              {details.color.map((color) => (
                <div key={color} className='size-6 rounded-sm' style={{ backgroundColor: color }} />
              ))}
            </div>
            <span className={styles.info_content}>{details.size}</span>
          </div>
        </div>

        <div className='flex gap-10'>
          <div className={styles.list}>
            <span className={styles.info_title}>List Price</span>
            <span className={styles.info_title}>Selling Price</span>
            <span className={styles.info_title}>Total Quantity</span>
          </div>
          <div className={styles.list}>
            <span className={styles.info_content}>{details.listPrice}</span>
            <span className={styles.info_content}>{details.sellingPrice}</span>
            <span className={styles.info_content}>{details.totalQuantity}</span>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-3'>
        <span className={styles.info_title}>Description</span>
        <p className={styles.info_content}>{details.description}</p>
      </div>
    </ContentCard>
  )
}

export default InformationPage
