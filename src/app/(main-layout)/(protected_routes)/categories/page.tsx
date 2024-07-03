import { verifySession } from '@/lib/session'
import { CategoryBoard } from './components'

export default async function CategoriesPage() {
  const { role } = await verifySession()

  return <CategoryBoard accountRole={role} />
}
