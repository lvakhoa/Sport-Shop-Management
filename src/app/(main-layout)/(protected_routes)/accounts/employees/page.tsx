import { verifySession } from '@/lib/session'
import { EmployeeAccountTable } from './components'

export default async function EmployeeAccountManagementPage() {
  const { role } = await verifySession()

  return (
    <div className='container mx-auto py-10'>
      <EmployeeAccountTable accountRole={role} />
    </div>
  )
}
