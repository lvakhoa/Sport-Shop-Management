import { PATH_NAME } from '@/configs'
import { SettingSidebarNav } from './components/settings-sidebar'

const settingsNavItems = [
  {
    title: 'Profile',
    href: `${PATH_NAME.SETTINGS}/profile`,
  },
  {
    title: 'Roles & Permissions',
    href: `${PATH_NAME.SETTINGS}/roles-permissions`,
  },
  {
    title: 'Shipping Setup',
    href: `${PATH_NAME.SETTINGS}/shipping-setup`,
  },
]

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='mx-[10px] flex flex-col space-y-4 min-[1100px]:flex-row min-[1100px]:space-x-4 min-[1100px]:space-y-0 '>
      <div className='min-[1100px]:w-1/5'>
        <SettingSidebarNav items={settingsNavItems} />
      </div>
      <div className='flex-1 min-[1100px]:max-w-full'>{children}</div>
    </div>
  )
}
