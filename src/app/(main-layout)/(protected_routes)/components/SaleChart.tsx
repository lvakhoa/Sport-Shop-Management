import moment from 'moment'
import { ChartData, ChartOptions } from 'chart.js'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/configs'
import { transactionApi } from '@/apis'
import { BarChartBig } from 'lucide-react'
import { ColumnChart } from '@/components/shared'
import { currencyFormatter } from '@/helpers'
import { useAuthStore } from '@/stores'

interface SaleChartProps {
  month: number
  year: number
}

function SaleChart({ month, year }: SaleChartProps) {
  const daysInMonth = moment.utc(`${year}-${month}`, ['YYYY-MM', 'YYYY-M']).daysInMonth()
  const firstDay = moment.utc(`${year}-${month}-${1}`, ['YYYY-MM-D', 'YYYY-M-D']).startOf('day')
  const lastDay = moment
    .utc(`${year}-${month}-${daysInMonth}`, ['YYYY-MM-DD', 'YYYY-M-DD'])
    .endOf('day')

  const accessToken = useAuthStore((state) => state.accessToken)
  const { data: totalSales } = useQuery({
    queryKey: queryKeys.totalEarnings.gen(month, year),
    queryFn: () => transactionApi.getTotalIncome(firstDay.unix(), lastDay.unix()),
    enabled: !!accessToken,
  })
  const salesInMonth = (totalSales as { total_income: string; date: Date }[] | undefined)?.map(
    (item) => Number(item.total_income),
  )
  const totalSalesInMonth = salesInMonth?.reduce((acc, val) => acc + val)

  const data: ChartData<'bar'> = {
    labels: Array.from({
      length: daysInMonth,
    }).map((_, index) => index + 1),
    datasets: [
      {
        label: 'Sales',
        data: salesInMonth ?? [],
        backgroundColor: '#FFDCD4',
        borderColor: '#FF6946',
        borderWidth: 1,
      },
    ],
  }

  const options: ChartOptions<'bar'> = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
  }

  return (
    <div className='flex flex-col'>
      <div className='flex items-center gap-11'>
        <div>
          <div className='flex items-center gap-2.5'>
            <BarChartBig width={20} height={24} color='#6E8F91' />
            <span className='text-md font-bold text-heading sm:text-lg'>
              {currencyFormatter(totalSalesInMonth ?? 0)}
            </span>
          </div>
          <p className='text-xs text-[#6E8F91]'>Total Sales</p>
        </div>
        <div>
          <div className='flex items-center gap-2.5'>
            <BarChartBig width={20} height={24} color='#6E8F91' />
            <span className='text:md font-bold text-heading sm:text-lg'>
              {currencyFormatter((totalSalesInMonth ?? 0) / daysInMonth)}
            </span>
          </div>
          <p className='text-xs text-[#6E8F91]'>Avg Sales Per Day</p>
        </div>
      </div>

      <div className='h-[40vh] w-full'>
        <ColumnChart data={data} options={options} />
      </div>
    </div>
  )
}

export default SaleChart
