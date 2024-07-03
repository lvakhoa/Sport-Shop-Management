import { verifySession } from '@/lib/session'
import { ProductsCard } from '../components'

async function ProductsPage() {
  const { role } = await verifySession()

  return <ProductsCard accountRole={role} />
}

export default ProductsPage
