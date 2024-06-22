'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Button, Checkbox } from '@/components/shared'
import { ArrowUpDown } from 'lucide-react'

type PermissionData = {
  permissionId: string
  hasPermission: boolean | undefined
}

export type PermissionColumn = {
  permission: string
  get: PermissionData
  post: PermissionData
  patch: PermissionData
  delete: PermissionData
}

export function permissionColumn(
  addPermission: (permissionId: string) => void,
  removePermission: (permissionId: string) => void,
): ColumnDef<PermissionColumn>[] {
  return [
    {
      accessorKey: 'permission',
      header: ({ column }) => {
        return (
          <Button
            className='pl-0'
            variant='ghost'
            style={{ backgroundColor: 'transparent' }}
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Permission
            <ArrowUpDown className='ml-2 size-4' />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue('permission')}</div>,
    },
    {
      accessorKey: 'get',
      header: () => {
        return (
          <Button className='pl-0' variant='ghost' style={{ backgroundColor: 'transparent' }}>
            READ
          </Button>
        )
      },
      cell: ({ row }) => {
        return (
          <Checkbox
            disabled={(row.getValue('get') as PermissionData).hasPermission === undefined}
            checked={(row.getValue('get') as PermissionData).hasPermission}
            onCheckedChange={(checked) =>
              checked
                ? addPermission((row.getValue('get') as PermissionData).permissionId)
                : removePermission((row.getValue('get') as PermissionData).permissionId)
            }
          />
        )
      },
    },
    {
      accessorKey: 'post',
      header: () => {
        return (
          <Button className='pl-0' variant='ghost' style={{ backgroundColor: 'transparent' }}>
            CREATE
          </Button>
        )
      },
      cell: ({ row }) => {
        return (
          <Checkbox
            disabled={(row.getValue('post') as PermissionData).hasPermission === undefined}
            checked={(row.getValue('post') as PermissionData).hasPermission}
            onCheckedChange={(checked) =>
              checked
                ? addPermission((row.getValue('post') as PermissionData).permissionId)
                : removePermission((row.getValue('post') as PermissionData).permissionId)
            }
          />
        )
      },
    },
    {
      accessorKey: 'patch',
      header: () => {
        return (
          <Button className='pl-0' variant='ghost' style={{ backgroundColor: 'transparent' }}>
            UPDATE
          </Button>
        )
      },
      cell: ({ row }) => {
        return (
          <Checkbox
            disabled={(row.getValue('patch') as PermissionData).hasPermission === undefined}
            checked={(row.getValue('patch') as PermissionData).hasPermission}
            onCheckedChange={(checked) =>
              checked
                ? addPermission((row.getValue('patch') as PermissionData).permissionId)
                : removePermission((row.getValue('patch') as PermissionData).permissionId)
            }
          />
        )
      },
    },
    {
      accessorKey: 'delete',
      header: () => {
        return (
          <Button className='pl-0' variant='ghost' style={{ backgroundColor: 'transparent' }}>
            DELETE
          </Button>
        )
      },
      cell: ({ row }) => {
        return (
          <Checkbox
            disabled={(row.getValue('delete') as PermissionData).hasPermission === undefined}
            checked={(row.getValue('delete') as PermissionData).hasPermission}
            onCheckedChange={(checked) =>
              checked
                ? addPermission((row.getValue('delete') as PermissionData).permissionId)
                : removePermission((row.getValue('delete') as PermissionData).permissionId)
            }
          />
        )
      },
    },
    // {
    //   id: 'edit',
    //   cell: ({ row }) => {
    //     const page = row.getValue('page') as string
    //     return (
    //       <div>
    //         <SidebarEdit
    //           title='Edit Permission'
    //           description={`Changing ${page} permissions`}
    //           content={<EditPermissionForm permission={row.original} />}
    //         >
    //           <Button
    //             className={cn('h-[30px] w-[30px] rounded-[3px] p-[5px]')}
    //             style={{ backgroundColor: editAction.background }}
    //           >
    //             <Image width={20} height={20} src={editAction.icon} alt={''} />
    //           </Button>
    //         </SidebarEdit>
    //       </div>
    //     )
    //   },
    // },
  ]
}
