import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ChartData,
  CategoryScale,
  LinearScale,
  BarElement,
  ChartOptions,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

type ColumnChartProps = {
  data: ChartData<'bar'>
  options: ChartOptions<'bar'>
}

function ColumnChart({ data, options }: ColumnChartProps) {
  return <Bar data={data} options={options} />
}

export default ColumnChart
