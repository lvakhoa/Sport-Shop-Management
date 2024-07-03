import { verifySession } from '@/lib/session'
import { ShippingForm } from './shipping-setup-form'

export default async function ShippingSetupPage() {
  const { role } = await verifySession()

  return (
    <div className='space-y-2'>
      <div>
        <span className='text-lg font-medium'>Shipping Setup</span>
      </div>
      <div className='my-[20px] w-full border-t border-gray-300'></div>
      <ShippingForm accountRole={role} />
    </div>
  )
}
