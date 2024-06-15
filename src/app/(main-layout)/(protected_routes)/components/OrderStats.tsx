import { orderApi } from '@/apis'
import { queryKeys } from '@/configs'
import { ORDER_STATUS } from '@/configs/enum'
import { useQueries } from '@tanstack/react-query'
import { Box, Clock7, Package2, PackageCheck, PackageX, Truck } from 'lucide-react'
import Tag from './Tag'
import moment from 'moment'
import { useAuthStore } from '@/stores'

const orderStats = [
  {
    icon: <Box color='#F23E14' width={24} height={32} />,
    iconBg: '#FEEBE7',
    title: 'Total Orders',
    titleColor: '#6E8F91',
    titleSize: 14,
    contentColor: '#1F1F39',
    contentSize: 18,
    background: '#FFFFFF',
  },
  {
    icon: <Clock7 color='#F5A509' width={24} height={32} />,
    iconBg: '#FEF6E6',
    title: 'Pending',
    titleColor: '#6E8F91',
    titleSize: 14,
    contentColor: '#1F1F39',
    contentSize: 18,
    background: '#FFFFFF',
  },
  {
    icon: <Package2 color='#2AC769' width={24} height={32} />,
    iconBg: '#E9F9F0',
    title: 'Confirmed',
    titleColor: '#6E8F91',
    titleSize: 14,
    contentColor: '#1F1F39',
    contentSize: 18,
    background: '#FFFFFF',
  },
  {
    icon: <Truck color='#007FE2' width={24} height={32} />,
    iconBg: '#E5F2FC',
    title: 'Ongoing',
    titleColor: '#6E8F91',
    titleSize: 14,
    contentColor: '#1F1F39',
    contentSize: 18,
    background: '#FFFFFF',
  },
  {
    icon: <PackageCheck color='#6A45FE' width={24} height={32} />,
    iconBg: '#F0ECFF',
    title: 'Delivered',
    titleColor: '#6E8F91',
    titleSize: 14,
    contentColor: '#1F1F39',
    contentSize: 18,
    background: '#FFFFFF',
  },
  {
    icon: <PackageX color='#FB4E4E' width={24} height={32} />,
    iconBg: '#FFEDED',
    title: 'Cancelled',
    titleColor: '#6E8F91',
    titleSize: 14,
    contentColor: '#1F1F39',
    contentSize: 18,
    background: '#FFFFFF',
  },
]

interface OrderStatsProps {
  fromDate?: Date
  toDate?: Date
}

function OrderStats({ fromDate, toDate }: OrderStatsProps) {
  const accessToken = useAuthStore((state) => state.accessToken)
  const {
    '0': { data: totalOrders },
    '1': { data: totalOrdersPending },
    '2': { data: totalOrdersConfirmed },
    '3': { data: totalOrdersCancelled },
  } = useQueries({
    queries: [
      {
        queryKey: queryKeys.orders.gen(
          1,
          undefined,
          fromDate ? moment(fromDate).unix() : undefined,
          toDate ? moment(toDate).unix() : undefined,
        ),
        queryFn: () =>
          orderApi.getAllOrders(
            1,
            1,
            fromDate ? moment(fromDate).unix() : undefined,
            toDate ? moment(toDate).unix() : undefined,
          ),
        enabled: !!accessToken,
      },
      {
        queryKey: queryKeys.orders.gen(
          1,
          ORDER_STATUS.PENDING,
          fromDate ? moment(fromDate).unix() : undefined,
          toDate ? moment(toDate).unix() : undefined,
        ),
        queryFn: () =>
          orderApi.getAllOrders(
            1,
            1,
            fromDate ? moment(fromDate).unix() : undefined,
            toDate ? moment(toDate).unix() : undefined,
            ORDER_STATUS.PENDING,
          ),
        enabled: !!accessToken,
      },
      {
        queryKey: queryKeys.allOrders.gen(
          ORDER_STATUS.SUCCESS,
          fromDate ? moment(fromDate).unix() : undefined,
          toDate ? moment(toDate).unix() : undefined,
        ),
        queryFn: () =>
          orderApi.getAllOrders(
            undefined,
            undefined,
            fromDate ? moment(fromDate).unix() : undefined,
            toDate ? moment(toDate).unix() : undefined,
            ORDER_STATUS.SUCCESS,
          ),
        enabled: !!accessToken,
      },
      {
        queryKey: queryKeys.orders.gen(
          1,
          ORDER_STATUS.CANCELLED,
          fromDate ? moment(fromDate).unix() : undefined,
          toDate ? moment(toDate).unix() : undefined,
        ),
        queryFn: () =>
          orderApi.getAllOrders(
            1,
            1,
            fromDate ? moment(fromDate).unix() : undefined,
            toDate ? moment(toDate).unix() : undefined,
            ORDER_STATUS.CANCELLED,
          ),
        enabled: !!accessToken,
      },
    ],
  })

  const ongoingOrders = !!totalOrdersConfirmed
    ? totalOrdersConfirmed.filter((item) => !item.shipment.shipped)
    : []
  const shippedOrders = !!totalOrdersConfirmed
    ? totalOrdersConfirmed.filter((item) => item.shipment.shipped)
    : []

  return (
    <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
      <Tag {...orderStats[0]} content={!!totalOrders ? totalOrders[0].total.toString() : '0'} />
      <Tag
        {...orderStats[1]}
        content={
          !!totalOrdersPending && totalOrdersPending.length > 0
            ? totalOrdersPending[0].total.toString()
            : '0'
        }
      />
      <Tag
        {...orderStats[2]}
        content={
          !!totalOrdersConfirmed && totalOrdersConfirmed.length > 0
            ? totalOrdersConfirmed[0].total.toString()
            : '0'
        }
      />
      <Tag {...orderStats[3]} content={ongoingOrders.length.toString()} />
      <Tag {...orderStats[4]} content={shippedOrders.length.toString()} />
      <Tag
        {...orderStats[5]}
        content={
          !!totalOrdersCancelled && totalOrdersCancelled.length > 0
            ? totalOrdersCancelled[0].total.toString()
            : '0'
        }
      />
    </div>
  )
}

export default OrderStats
