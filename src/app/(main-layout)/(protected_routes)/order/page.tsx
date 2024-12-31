import { OrderTable } from './components'
import { verifySession } from '@/lib/session'

export default async function OrdersManagementPage() {
  const { role } = await verifySession()

  return (
    <div className='container mx-auto py-10'>
      <OrderTable accountRole={role} />
    </div>
  )
}
