import { Box, CircleDollarSign, Shirt, Users } from 'lucide-react'
import Tag, { TagProps } from './Tag'
import { useQueries, useQuery } from '@tanstack/react-query'
import { customerApi, orderApi, productApi, transactionApi } from '@/apis'
import { queryKeys } from '@/configs'
import { currencyFormatter } from '@/helpers'
import { useAuth } from '@/hooks'
import { useAuthStore } from '@/stores'

const overviewStats = [
  {
    icon: <CircleDollarSign color='#FD0063' width={24} height={32} />,
    iconBg: '#FFFFFF',
    title: 'Total Earnings',
    titleColor: '#FFFFFF',
    titleSize: 16,
    contentColor: '#FFFFFF',
    contentSize: 22,
    background: '#FD0063',
  },
  {
    icon: <Box color='#F23E14' width={24} height={32} />,
    iconBg: '#FFFFFF',
    title: 'Total Orders',
    titleColor: '#FFFFFF',
    titleSize: 16,
    contentColor: '#FFFFFF',
    contentSize: 22,
    background: '#F23E14',
  },
  {
    icon: <Users color='#6A45FE' width={24} height={32} />,
    iconBg: '#FFFFFF',
    title: 'Total Customers',
    titleColor: '#FFFFFF',
    titleSize: 16,
    contentColor: '#FFFFFF',
    contentSize: 22,
    background: '#6A45FE',
  },
  {
    icon: <Shirt color='#426EFF' width={24} height={32} />,
    iconBg: '#FFFFFF',
    title: 'Total Products',
    titleColor: '#FFFFFF',
    titleSize: 16,
    contentColor: '#FFFFFF',
    contentSize: 22,
    background: '#426EFF',
  },
]

type Props = {}

function OverviewTag({}: Props) {
  const accessToken = useAuthStore((state) => state.accessToken)
  const {
    '0': { data: totalEarnings },
    '1': { data: totalOrders },
    '2': { data: totalCustomers },
    '3': { data: totalProducts },
  } = useQueries({
    queries: [
      {
        queryKey: queryKeys.totalEarnings.gen(),
        queryFn: () => transactionApi.getTotalIncome(),
        enabled: !!accessToken,
      },
      {
        queryKey: queryKeys.orders.gen(1),
        queryFn: () => orderApi.getAllOrders(1, 1),
        enabled: !!accessToken,
      },
      {
        queryKey: queryKeys.customers.gen(1),
        queryFn: () => customerApi.getAllCustomers(1, 1),
        enabled: !!accessToken,
      },
      {
        queryKey: queryKeys.products.gen(1),
        queryFn: () => productApi.getAllProduct(1, 1),
        enabled: !!accessToken,
      },
    ],
  })

  const totalIncome = Number((totalEarnings as { total_income: string } | undefined)?.total_income)

  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
      <Tag
        {...overviewStats[0]}
        content={currencyFormatter(isNaN(totalIncome) ? 0 : totalIncome)}
      />
      <Tag {...overviewStats[1]} content={`${!!totalOrders ? totalOrders[0].total : 0}`} />
      <Tag {...overviewStats[2]} content={`${!!totalCustomers ? totalCustomers[0].total : 0}`} />
      <Tag {...overviewStats[3]} content={`${!!totalProducts ? totalProducts[0].total : 0}`} />
    </div>
  )
}

export default OverviewTag
