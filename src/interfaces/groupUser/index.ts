import { ROLE_NAME } from '@/configs/enum'
import { IUser } from '../users'
import { IPermission } from '../permission'

export interface IGroupUser {
  id: string
  title: string
  description?: string
  applied_role: ROLE_NAME
  users: IUser[]
  granted_permissions: IPermission[]
}
