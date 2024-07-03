import { StockTable } from './components'
import { verifySession } from '@/lib/session'

export default async function StockManagementPage() {
  const { role } = await verifySession()

  return (
    <div className='container mx-auto py-10'>
      <StockTable accountRole={role} />
    </div>
  )
}
