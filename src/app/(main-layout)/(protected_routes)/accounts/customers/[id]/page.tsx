'use client'

import { customerAccountApi, productApi, voucherApi } from '@/apis'
import { Button, ContentCard, Skeleton } from '@/components/shared'
import { queryKeys } from '@/configs'
import { STATUS } from '@/configs/enum'
import { colorFormatter, currencyFormatter } from '@/helpers'
import { useQuery } from '@tanstack/react-query'
import { notFound, useParams } from 'next/navigation'
import styles from '@/components/shared/ContentCard/ContentCard.module.css'
import { PATH_NAME } from '@/configs'
import { Breadcrumb } from '@/components/shared'
import moment from 'moment'
import Link from 'next/link'

interface ICustomerInfo {
  email: string
  name: string
  id: string
}

const breadcrumbItems = [
  {
    name: 'Accounts',
    link: PATH_NAME.ACCOUNT.BASE + PATH_NAME.ACCOUNT.CUSTOMER,
  },
]

function InformationPage() {
  const { id: accountId } = useParams<{ id: string }>()
  const { data, isPending } = useQuery({
    queryKey: queryKeys.customerAccountDetails.gen(accountId),
    queryFn: () => customerAccountApi.getCustomerAccountById(accountId),
  })

  const details: ICustomerInfo | undefined =
    !!data && !!data.customer
      ? {
          email: data.email,
          name: data.customer.fullname,
          id: data.customer.id,
        }
      : undefined

  return (
    <>
      <div className='mx-6 my-4'>
        <Breadcrumb items={breadcrumbItems} page='View' className='mb-6' textSize={22} />
        <ContentCard title='Information'>
          {!isPending && (
            <>
              {!details && (
                <div className='flex h-60 flex-col items-center justify-center gap-3'>
                  This account has no customers
                  <Link href={PATH_NAME.CUSTOMER}>
                    <Button size='sm'>Go to customers</Button>
                  </Link>
                </div>
              )}
              {!!details && (
                <>
                  <div className='mb-6 flex flex-col gap-y-2 sm:flex-row sm:gap-20 md:gap-32'>
                    <div className='flex min-w-[260px] gap-10'>
                      <div className={styles.list}>
                        <span className={styles.info_title}>Name</span>
                        <span className={styles.info_title}>Email</span>
                      </div>
                      <div className={styles.list}>
                        <span className={styles.info_content}>{details.name}</span>
                        <span className={styles.info_content}>{details.email}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Link href={`${PATH_NAME.CUSTOMER}/${details.id}`}>
                      <Button size='sm'>Go to customer&#39;s details</Button>
                    </Link>
                  </div>
                </>
              )}
            </>
          )}
          {isPending && <Skeleton className='h-[50px] w-[250px] rounded-xl' />}
        </ContentCard>
      </div>
    </>
  )
}

export default InformationPage
