'use client'

import { employeeApi } from '@/apis'
import { ContentCard } from '@/components/shared'
import { queryKeys } from '@/configs'
import { GENDER } from '@/configs/enum'
import { useQuery } from '@tanstack/react-query'
import { notFound, useParams } from 'next/navigation'
import moment from 'moment'

import styles from '@/components/shared/ContentCard/ContentCard.module.css'

interface IEmployeeInfo {
  name: string
  phone: string
  gender: GENDER
}

function ProfilePage() {
  const { id: employeeId } = useParams<{ id: string }>()
  const { data } = useQuery({
    queryKey: queryKeys.employeeDetails.gen(employeeId),
    queryFn: () => employeeApi.getEmployeesById(employeeId),
    throwOnError(error, query) {
      notFound()
    },
  })

  const details: IEmployeeInfo = {
    name: data?.fullname ?? '',
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
            <span className={styles.info_title}>Email</span>
            <span className={styles.info_title}>Gender</span>
            <span className={styles.info_title}>Started Date</span>
            <span className={styles.info_title}>Salary</span>
            <span className={styles.info_title}>Position</span>
          </div>
          <div className={styles.list}>
            <span className={styles.info_content}>{details.name}</span>
            <span className={styles.info_content}>{details.phone}</span>
            <span className={styles.info_content}>{details.gender}</span>
          </div>
        </div>
      </div>
    </ContentCard>
  )
}

export default ProfilePage
