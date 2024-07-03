import { verifySession } from '@/lib/session'
import { CategoryCard } from '../components'

async function CategoriesPage() {
  const { role } = await verifySession()

  return <CategoryCard accountRole={role} />
}

export default CategoriesPage
