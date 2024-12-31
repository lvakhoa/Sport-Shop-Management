import { METHOD } from '@/configs/enum'
import { IGroupUser } from '../groupUser'

export interface IPermissionRequest {
  title?: string
  description?: string
  api?: string
  method?: METHOD
  role_list?: {
    role_id: string
  }[]
}

export interface IPermission {
  id: string
  title: string
  description?: string
  api: string
  method: METHOD
  granted_groups: IGroupUser[]
  total: number
}
