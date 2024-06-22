import { HTTP_METHOD } from '@/configs/enum'

export interface IPermissionRequest {
  title?: string
  description?: string
  api?: string
  method?: HTTP_METHOD
  role_list?: {
    role_id: string
  }[]
}

export interface IPermissionResponse {
  id: string
  title: string
  description?: string
  api: string
  method: HTTP_METHOD
  created_at: Date
  updated_at: Date
  grant_permissions: {
    role: {
      id: string
      title: string
    }
  }[]
  total: number
}
