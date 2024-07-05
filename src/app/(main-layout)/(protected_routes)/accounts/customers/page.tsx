import { verifySession } from '@/lib/session'
import { CustomerAccountTable } from './components'

export default async function CustomerAccountManagementPage() {
  const { role } = await verifySession()

  return (
    <div className='container mx-auto py-10'>
      <CustomerAccountTable accountRole={role} />
    </div>
  )
}
