import { ROLE_NAME } from '@/configs/enum'

export interface IRoleRequest {
  title?: ROLE_NAME
  description?: string
  permission_list?: {
    permission_id: string
  }[]
}

export interface IRoleResponse {
  id: string
  title: ROLE_NAME
  description?: string
  created_at: Date
  updated_at: Date
  grant_permissions: {
    permission: {
      id: string
      title: string
    }
  }[]
}
