import moment from 'moment'
import { ChartData, ChartOptions } from 'chart.js'
import { useQueries } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { orderApi } from '@/apis'
import { PieChart } from '@/components/shared'
import { useAuthStore } from '@/stores'
import { ORDER_STATUS } from '@/configs/enum'

interface OrderChartProps {
  fromDate?: Date
  toDate?: Date
}

function OrderChart({ fromDate, toDate }: OrderChartProps) {
  const accessToken = useAuthStore((state) => state.accessToken)
  const {
    '0': { data: totalOrdersPending },
    '1': { data: totalOrdersConfirmed },
    '2': { data: totalOrdersCancelled },
  } = useQueries({
    queries: [
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
  const summaryData = [
    !!totalOrdersPending && totalOrdersPending.length > 0 ? totalOrdersPending[0].total : 0,
    (!!totalOrdersConfirmed ? totalOrdersConfirmed.filter((item) => !item.shipment.shipped) : [])
      .length,
    (!!totalOrdersConfirmed ? totalOrdersConfirmed.filter((item) => item.shipment.shipped) : [])
      .length,
    !!totalOrdersCancelled && totalOrdersCancelled.length > 0 ? totalOrdersCancelled[0].total : 0,
  ]

  const data: ChartData<'pie'> = {
    labels: ['Pending', 'Ongoing', 'Delivered', 'Cancelled'],
    datasets: [
      {
        label: 'Sales',
        data: summaryData,
        backgroundColor: ['#FEF6E6', '#E5F2FC', '#F0ECFF', '#FFEDED'],
        borderColor: ['#F5A509', '#007FE2', '#6A45FE', '#FB4E4E'],
        borderWidth: 1,
      },
    ],
  }

  const options: ChartOptions<'pie'> = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
    },
  }

  return (
    <div className='h-[40vh]'>
      <PieChart data={data} options={options} />
    </div>
  )
}

export default OrderChart
