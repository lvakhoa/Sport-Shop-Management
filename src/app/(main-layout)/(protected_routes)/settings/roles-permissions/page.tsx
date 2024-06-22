import { RolePermissionTable } from './roles-permissions-panel'

export default function RolePermissionPage() {
  return (
    <div className='space-y-2'>
      <div>
        <span className='text-lg font-medium'>Roles & Permissions</span>
      </div>
      <div className='my-[20px] w-full border-t border-gray-300'></div>
      <RolePermissionTable />
    </div>
  )
}
