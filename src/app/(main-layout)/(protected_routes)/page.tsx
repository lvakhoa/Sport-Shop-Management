'use client'

import { Button, DateRangePicker } from '@/components/shared'
import Image from 'next/image'
import { HomeCard, OrderChart, OrderStats, OverviewTag, SaleChart } from './components'
import { useState } from 'react'
import moment from 'moment'
import { useProfile } from '@/hooks'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { stockApi } from '@/apis'
import { ProductItem } from './pos/components'
import { DateRange } from 'react-day-picker'

const generateGreetings = () => {
  const currentHour = moment().hours()

  if (currentHour >= 3 && currentHour < 12) {
    return 'Good Morning!'
  } else if (currentHour >= 12 && currentHour < 15) {
    return 'Good Afternoon!'
  } else if (currentHour >= 15 || currentHour < 3) {
    return 'Good Evening!'
  } else {
    return 'Hello!'
  }
}

export default function Home() {
  const { data: info } = useProfile()
  const [date, setDate] = useState({
    month: moment().utc().month() + 1,
    year: moment().utc().year(),
  })
  const [orderStatsDate, setOrderStatsDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })
  const [orderSummaryDate, setOrderSummaryDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })

  const { data } = useQuery({
    queryKey: queryKeys.topProducts,
    queryFn: () => stockApi.getBestSeller(12),
  })

  const topProducts =
    data?.map((item) => {
      return {
        id: item.id,
        name: item.product.name,
        price: parseInt(item.product.selling_price),
        image: item.media?.url ?? '',
      }
    }) || []

  return (
    <div className='mx-6'>
      <div className='mb-8'>
        <h3 className='mb-1.5 text-2xl font-bold text-primary'>{generateGreetings()}</h3>
        <h4 className='text-xl font-medium text-heading'>{info?.fullname}</h4>
      </div>

      <div className='mb-9'>
        <h4 className='mb-3 text-xl font-semibold capitalize text-heading'>Overview</h4>
        <OverviewTag />
      </div>

      <div className='mb-6'>
        <div className='mb-3 flex items-center justify-between '>
          <h4 className='text-xl font-semibold capitalize text-heading'>Order Statistics</h4>
          <DateRangePicker date={orderStatsDate} setDate={setOrderStatsDate} />
        </div>
        <OrderStats fromDate={orderStatsDate?.from} toDate={orderStatsDate?.to} />
      </div>

      <div className='mb-6'>
        <HomeCard title='Sales Summary'>
          <SaleChart month={date.month} year={date.year} />
        </HomeCard>
      </div>

      <div className='mb-6'>
        <HomeCard
          title='Orders Summary'
          haveDateRange
          date={orderSummaryDate}
          setDate={setOrderSummaryDate}
        >
          <OrderChart fromDate={orderSummaryDate?.from} toDate={orderSummaryDate?.to} />
        </HomeCard>
      </div>

      <div className='mb-6'>
        <HomeCard title='Top Products'>
          <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
            {!!topProducts && topProducts.map((item) => <ProductItem key={item.id} {...item} />)}
          </div>
        </HomeCard>
      </div>
    </div>
  )
}
