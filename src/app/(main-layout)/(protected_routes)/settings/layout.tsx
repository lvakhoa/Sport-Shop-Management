import { SettingSidebarNav } from './components/settings-sidebar'

const settingsNavItems = [
  {
    title: 'Profile',
    href: '/settings/profile',
  },
  {
    title: 'Roles & Permissions',
    href: '/settings/roles-permissions',
  },
  {
    title: 'Shipping Setup',
    href: '/settings/shipping-setup',
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
