import { PATH_NAME } from '@/configs'
import { SettingSidebarNav } from '../settings/components/settings-sidebar'

const accountNavItems = [
  {
    title: 'Employee',
    href: `${PATH_NAME.ACCOUNT.BASE}${PATH_NAME.ACCOUNT.EMPLOYEE}`,
  },
  {
    title: 'Customer',
    href: `${PATH_NAME.ACCOUNT.BASE}${PATH_NAME.ACCOUNT.CUSTOMER}`,
  },
]

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='mx-[10px] flex flex-col space-y-4 min-[1100px]:flex-row min-[1100px]:space-x-4 min-[1100px]:space-y-0 '>
      <div className='min-[1100px]:w-1/5'>
        <SettingSidebarNav items={accountNavItems} />
      </div>
      <div className='flex-1 min-[1100px]:max-w-full'>{children}</div>
    </div>
  )
}
