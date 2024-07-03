import { ProductTable } from './components'
import { verifySession } from '@/lib/session'

export default async function ProductsManagementPage() {
  const { role } = await verifySession()

  return (
    <div className='container mx-auto py-10'>
      <ProductTable accountRole={role} />
    </div>
  )
}
