'use client'
import { queryKeys } from '@/configs'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { roleApi } from '@/apis'
import { Card } from '@/components/shared/card'
import { Button } from '@/components/shared'
import { KeyRound } from 'lucide-react'
import Link from 'next/link'
import { ROLE_TITLE } from '@/configs/enum'

export interface IRole {
  id?: string
  title?: ROLE_TITLE
  grant_permissions?: {
    permission?: {
      id?: string
      title?: string
    }
  }[]
}
export function RolePermissionTable() {
  const router = useRouter()
  const { data: rolesData } = useQuery({
    queryKey: queryKeys.roles,
    queryFn: () => roleApi.getAllRoles(),
  })
  const data: IRole[] =
    rolesData?.map((item) => {
      return {
        id: item.id,
        title: item.title,
        grant_permissions: item.grant_permissions.map((permission) => {
          return {
            permission: {
              id: permission.permission.id,
              title: permission.permission.title,
            },
          }
        }),
      }
    }) ?? []
  return (
    <div className='flex flex-col gap-2'>
      {data.map((item) => (
        <div key={item.id}>
          <Card className='flex flex-row items-center justify-between p-[10px]'>
            <span className='text-lg font-medium '>{item.title}</span>
            <Link
              href={{
                pathname: `roles-permissions/${item.id}`,
              }}
            >
              <Button variant='outline' className='h-auto border-primary px-[3px] py-px'>
                <KeyRound size={12} stroke='var(--blue-100)' />
                <span className='ml-[3px] text-[12px] text-primary'>Permissions</span>
              </Button>
            </Link>
          </Card>
        </div>
      ))}
    </div>
  )
}
