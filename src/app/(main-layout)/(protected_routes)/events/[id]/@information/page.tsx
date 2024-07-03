'use client'

import { eventApi } from '@/apis'
import { ContentCard } from '@/components/shared'
import { queryKeys } from '@/configs'
import { STATUS } from '@/configs/enum'
import { colorFormatter, currencyFormatter } from '@/helpers'
import { useQuery } from '@tanstack/react-query'
import { notFound, useParams } from 'next/navigation'
import styles from '@/components/shared/ContentCard/ContentCard.module.css'
import moment from 'moment'
import Image from 'next/image'

interface IEventInfo {
  title: string
  content?: string
  start_date: Date
  end_date: Date
  sale_percent: number
  media?: {
    url: string
  }
}

function InformationPage() {
  const { id: eventId } = useParams<{ id: string }>()
  const { data } = useQuery({
    queryKey: queryKeys.eventDetails.gen(eventId),
    queryFn: () => eventApi.getEventById(eventId),
    throwOnError(error, query) {
      notFound()
    },
  })

  const details: IEventInfo = {
    title: data?.title ?? '',
    content: data?.content,
    start_date: data?.start_date ?? moment().toDate(),
    end_date: data?.end_date ?? moment().toDate(),
    sale_percent: data?.sale_percent ?? 0,
    media: data?.media,
  }

  return (
    <ContentCard title='Information'>
      <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:gap-20'>
        {!!details.media && <Image alt='' width={300} height={100} src={details.media.url} />}
        <div className='flex gap-10'>
          <div className={styles.list}>
            <span className={styles.info_title}>Title</span>
            <span className={styles.info_title}>Sale Percent</span>
            <span className={styles.info_title}>Start Date</span>
            <span className={styles.info_title}>End Date</span>
          </div>
          <div className={styles.list}>
            <span className={styles.info_content}>{details.title}</span>
            <span className={styles.info_content}>{details.sale_percent}</span>
            <span className={styles.info_content}>
              {moment(details.start_date).format('DD-MM-YYYY')}
            </span>
            <span className={styles.info_content}>
              {moment(details.end_date).format('DD-MM-YYYY')}
            </span>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-3'>
        <span className={styles.info_title}>Content</span>
        <p className={styles.info_content}>{details.content}</p>
      </div>
    </ContentCard>
  )
}

export default InformationPage
