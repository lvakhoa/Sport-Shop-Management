'use client'

import { customerApi } from '@/apis'
import { ContentCard } from '@/components/shared'
import { queryKeys } from '@/configs'
import { GENDER } from '@/configs/enum'
import { useQuery } from '@tanstack/react-query'
import { notFound, useParams } from 'next/navigation'

import styles from '@/components/shared/ContentCard/ContentCard.module.css'

interface ICustomerInfo {
  fullname: string
  phone: string
  gender: GENDER
}

function ProfilePage() {
  const { id: customerId } = useParams<{ id: string }>()
  const { data } = useQuery({
    queryKey: queryKeys.customerDetails.gen(customerId),
    queryFn: () => customerApi.getCustomerById(customerId),
    throwOnError(error, query) {
      notFound()
    },
  })

  const details: ICustomerInfo = {
    fullname: data?.fullname ?? '',
    phone: data?.phone ?? '',
    gender: data?.gender ?? GENDER.MALE,
  }

  return (
    <ContentCard title='Profile'>
      <div className='mb-6 flex flex-col gap-y-2 sm:flex-row sm:gap-20 md:gap-32'>
        <div className='flex min-w-[260px] gap-10'>
          <div className={styles.list}>
            <span className={styles.info_title}>Name</span>
            <span className={styles.info_title}>Phone</span>
            <span className={styles.info_title}>Gender</span>
          </div>
          <div className={styles.list}>
            <span className={styles.info_content}>{details.fullname}</span>
            <span className={styles.info_content}>{details.phone}</span>
            <span className={styles.info_content}>{details.gender}</span>
          </div>
        </div>
      </div>
    </ContentCard>
  )
}

export default ProfilePage
