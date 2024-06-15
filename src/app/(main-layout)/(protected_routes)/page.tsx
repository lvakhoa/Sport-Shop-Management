'use client'

import { Button } from '@/components/shared'
import Image from 'next/image'
import { HomeCard, OrderChart, OrderStats, OverviewTag, SaleChart } from './components'
import { useState } from 'react'
import moment from 'moment'
import { useProfile } from '@/hooks'

const generateGreetings = () => {
  const currentHour = moment().hours()

  if (currentHour >= 3 && currentHour < 12) {
    return 'Good Morning!'
  } else if (currentHour >= 12 && currentHour < 15) {
    return 'Good Afternoon!'
  } else if (currentHour >= 15) {
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
  const [orderStatsDate, setOrderStatsDate] = useState({
    month: moment().utc().month() + 1,
    year: moment().utc().year(),
  })

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
        <div className='flex items-center justify-between'>
          <h4 className='mb-3 text-xl font-semibold capitalize text-heading'>Order Statistics</h4>
          <div></div>
        </div>
        <OrderStats />
      </div>

      <div className='mb-6'>
        <HomeCard title='Sales Summary'>
          <SaleChart month={date.month} year={date.year} />
        </HomeCard>
      </div>

      <div className='mb-6'>
        <HomeCard title='Orders Summary'>
          <OrderChart />
        </HomeCard>
      </div>

      <div className='mb-6'>
        <HomeCard title='Top Products'></HomeCard>
      </div>
    </div>
  )
}
