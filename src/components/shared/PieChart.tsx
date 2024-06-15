import { Chart as ChartJS, Tooltip, Legend, ChartData, ChartOptions, ArcElement } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

type PieChartProps = {
  data: ChartData<'pie'>
  options: ChartOptions<'pie'>
}

function PieChart({ data, options }: PieChartProps) {
  return <Pie data={data} options={options} />
}

export default PieChart
