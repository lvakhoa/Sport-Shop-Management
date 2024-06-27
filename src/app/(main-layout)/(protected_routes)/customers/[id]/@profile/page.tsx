'use client'

import { customerApi } from '@/apis'
import { ContentCard } from '@/components/shared'
import { queryKeys } from '@/configs'
import { GENDER, RANK } from '@/configs/enum'
import { useQuery } from '@tanstack/react-query'
import { notFound, useParams } from 'next/navigation'

import styles from '@/components/shared/ContentCard/ContentCard.module.css'

interface ICustomerInfo {
  name: string
  phone: string
  email: string
  gender: GENDER
  rank: RANK
  loyalty_point: number
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
    name: data?.fullname ?? '',
    phone: data?.phone ?? '',
    email: data?.email ?? '',
    gender: data?.gender ?? GENDER.MALE,
    rank: data?.rank ?? RANK.COPPER,
    loyalty_point: data?.loyalty_point ?? 0,
  }

  return (
    <ContentCard title='Profile'>
      <div className='mb-6 flex flex-col gap-y-2 sm:flex-row sm:gap-20 md:gap-32'>
        <div className='flex min-w-[260px] gap-10'>
          <div className={styles.list}>
            <span className={styles.info_title}>Name</span>
            <span className={styles.info_title}>Phone</span>
            <span className={styles.info_title}>Email</span>
            <span className={styles.info_title}>Gender</span>
            <span className={styles.info_title}>Rank</span>
            <span className={styles.info_title}>Loyalty Point</span>
          </div>
          <div className={styles.list}>
            <span className={styles.info_content}>{details.name}</span>
            <span className={styles.info_content}>{details.phone}</span>
            <span className={styles.info_content}>{details.email}</span>
            <span className={styles.info_content}>{details.gender}</span>
            <span className={styles.info_content}>{details.rank}</span>
            <span className={styles.info_content}>{details.loyalty_point}</span>
          </div>
        </div>
      </div>
    </ContentCard>
  )
}

export default ProfilePage
