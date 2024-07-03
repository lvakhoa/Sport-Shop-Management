import { verifySession } from '@/lib/session'
import { VoucherTable } from './components'

export default async function VouchersManagementPage() {
  const { role } = await verifySession()

  return (
    <div className='container mx-auto py-10'>
      <VoucherTable accountRole={role} />
    </div>
  )
}
