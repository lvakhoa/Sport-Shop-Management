import { EventTable } from './components'
import { verifySession } from '@/lib/session'

export default async function EventsManagementPage() {
  const { role } = await verifySession()

  return (
    <div className='container mx-auto py-10'>
      <EventTable accountRole={role} />
    </div>
  )
}
