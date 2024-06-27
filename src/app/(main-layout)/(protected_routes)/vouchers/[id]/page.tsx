'use client'

import { productApi, voucherApi } from '@/apis'
import { ContentCard } from '@/components/shared'
import { queryKeys } from '@/configs'
import { STATUS } from '@/configs/enum'
import { colorFormatter, currencyFormatter } from '@/helpers'
import { useQuery } from '@tanstack/react-query'
import { notFound, useParams } from 'next/navigation'
import styles from '@/components/shared/ContentCard/ContentCard.module.css'
import { PATH_NAME } from '@/configs'
import { Breadcrumb } from '@/components/shared'
import moment from 'moment'

interface IVoucherInfo {
  title: string
  code: string
  sale_percent: number
  quantity: number
  expired_date: Date
}

const breadcrumbItems = [
  {
    name: 'Vouchers',
    link: PATH_NAME.VOUCHER,
  },
]

function InformationPage() {
  const { id: voucherId } = useParams<{ id: string }>()
  const { data } = useQuery({
    queryKey: queryKeys.voucherDetails.gen(voucherId),
    queryFn: () => voucherApi.getVoucherById(voucherId),
    throwOnError(error, query) {
      notFound()
    },
  })

  const details: IVoucherInfo = {
    title: data?.title ?? '',
    code: data?.code ?? '',
    sale_percent: data?.sale_percent ?? 0,
    quantity: data?.quantity ?? 0,
    expired_date: data?.expired_date ?? new Date(),
  }

  return (
    <div className='mx-6 my-4'>
      <Breadcrumb items={breadcrumbItems} page='View' className='mb-6' textSize={22} />
      <ContentCard title='Information'>
        <div className='mb-6 flex flex-col gap-y-2 sm:flex-row sm:gap-20 md:gap-32'>
          <div className='flex min-w-[260px] gap-10'>
            <div className={styles.list}>
              <span className={styles.info_title}>Title</span>
              <span className={styles.info_title}>Code</span>
              <span className={styles.info_title}>Sale percent</span>
              <span className={styles.info_title}>Quantity</span>
              <span className={styles.info_title}>Expired Date</span>
            </div>
            <div className={styles.list}>
              <span className={styles.info_content}>{details.title}</span>
              <span className={styles.info_content}>{details.code}</span>
              <span className={styles.info_content}>{details.sale_percent}</span>
              <span className={styles.info_content}>{details.quantity}</span>
              <span className={styles.info_content}>
                {moment(details.expired_date).format('DD/MM/YYYY')}
              </span>
            </div>
          </div>
        </div>
      </ContentCard>
    </div>
  )
}

export default InformationPage
