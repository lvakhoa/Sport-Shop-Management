'use client'

import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { permissionApi, roleApi } from '@/apis'
import { queryKeys } from '@/configs'
import { IRole } from '../roles-permissions-panel'
import { Button, DataTable } from '@/components/shared'
import { useState } from 'react'
import { PaginationState } from '@tanstack/react-table'
import { permissionColumn, PermissionColumn } from '../component/permission-columns'
import { IFilterInput } from '@/interfaces'
import { FILTER_INPUT_TYPE } from '@/configs/enum'
import { toast } from 'react-toastify'

const PermissionFilterInput: IFilterInput[] = [
  {
    key: 'page',
    title: 'Page',
    type: FILTER_INPUT_TYPE.TEXTBOX,
  },
]

export interface IPermission {
  id: string
  title: string
  api: string
  method: string
  grant_permissions: {
    role: {
      id: string
      title: string
    }
  }[]
  total: number
}

function PermissionsDetail() {
  const { id: roleId } = useParams<{ id: string }>()
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  function extract(path: string): string {
    const segments = path
      .split('/')
      .filter((segment) => segment !== '')
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    return segments.length > 0 ? segments.join(' ') : ''
  }

  const { data: roleData } = useQuery({
    queryKey: queryKeys.roleDetails.gen(roleId),
    queryFn: () => roleApi.getRoleById(roleId),
  })

  const { data: permissionsData } = useQuery({
    queryKey: queryKeys.permissions.gen(),
    queryFn: () => permissionApi.getAllPermission(),
  })

  const [selectedPermissions, setSelectedPermissions] = useState<{ permission_id: string }[]>([])

  useEffect(() => {
    if (!!roleData) {
      setSelectedPermissions(
        roleData.grant_permissions.map((permission) => ({
          permission_id: permission.permission.id,
        })),
      )
    }
  }, [roleData])

  const selectPermission = (permissionId: string) => {
    setSelectedPermissions([...selectedPermissions, { permission_id: permissionId }])
  }

  const unselectPermission = (permissionId: string) => {
    setSelectedPermissions(selectedPermissions.filter((val) => val.permission_id !== permissionId))
  }

  console.log(selectedPermissions)

  const { mutate: updatePermissionList } = useMutation({
    mutationFn: () =>
      roleApi.updateRole(
        {
          permission_list: selectedPermissions,
        },
        roleId,
      ),
    onSuccess: () => {
      toast.success('Permission updated successfully')
    },
    onError: () => {
      toast.error('Error updating permission')
    },
  })

  const role: IRole = {
    id: roleData?.id,
    title: roleData?.title,
    grant_permissions: roleData?.grant_permissions?.map((permission) => {
      return {
        permission: {
          id: permission.permission.id,
          title: permission.permission.title,
        },
      }
    }),
  } ?? {
    id: '',
    title: '',
    grant_permissions: [],
  }

  const [permissions, setPermissions] = useState<IPermission[]>([])

  useEffect(() => {
    if (!!permissionsData) {
      setPermissions(
        permissionsData.map((item) => {
          return {
            id: item.id,
            title: item.title,
            api: item.api,
            method: item.method,
            grant_permissions: item.grant_permissions.map((role) => {
              return {
                role: {
                  id: role.role.id,
                  title: role.role.title,
                },
              }
            }),
            total: item.total,
          }
        }),
      )
    }
  }, [permissionsData])

  const groupPermission = new Map<
    string,
    | {
        get: string | undefined
        post: string | undefined
        patch: string | undefined
        delete: string | undefined
      }
    | undefined
  >()
  permissions.map((val) => {
    const key = val.api
    const method = val.method
    if (!groupPermission.has(key)) {
      groupPermission.set(key, {
        get: undefined,
        post: undefined,
        patch: undefined,
        delete: undefined,
      })
    }
    const permission = groupPermission.get(key)
    if (!!permission) {
      if (method === 'GET') permission.get = val.id
      if (method === 'POST') permission.post = val.id
      if (method === 'PATCH') permission.patch = val.id
      if (method === 'DELETE') permission.delete = val.id
    }
    return groupPermission.set(key, permission)
  })

  const tableData: PermissionColumn[] = []
  groupPermission.forEach((value, key) => {
    tableData.push({
      permission: extract(key),
      get: {
        permissionId: value?.get ?? '',
        hasPermission:
          typeof value?.get === 'string'
            ? selectedPermissions.some((val) => val.permission_id === value.get)
            : undefined,
      },
      post: {
        permissionId: value?.post ?? '',
        hasPermission:
          typeof value?.post === 'string'
            ? selectedPermissions.some((val) => val.permission_id === value?.post)
            : undefined,
      },
      patch: {
        permissionId: value?.patch ?? '',
        hasPermission:
          typeof value?.patch === 'string'
            ? selectedPermissions.some((val) => val.permission_id === value?.patch)
            : undefined,
      },
      delete: {
        permissionId: value?.delete ?? '',
        hasPermission:
          typeof value?.delete === 'string'
            ? selectedPermissions.some((val) => val.permission_id === value?.delete)
            : undefined,
      },
    })
  })

  return (
    <div>
      <DataTable
        title={role.title?.toString() ?? ''}
        columns={permissionColumn(selectPermission, unselectPermission)}
        data={tableData.slice(
          pagination.pageIndex * pagination.pageSize,
          pagination.pageIndex * pagination.pageSize + pagination.pageSize,
        )}
        pagination={pagination}
        setPagination={setPagination}
        filterInput={PermissionFilterInput}
        pageCount={Math.ceil(tableData.length / pagination.pageSize)}
        showAddButton={false}
      />
      <Button
        onClick={() => {
          updatePermissionList()
        }}
      >
        Save
      </Button>
    </div>
  )
}

export default PermissionsDetail
