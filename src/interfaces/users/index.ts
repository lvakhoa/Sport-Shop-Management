import { ICustomer } from '@/interfaces/customer'
import { IEmployee } from '@/interfaces/employee'
import { ROLE_NAME } from '@/configs/enum'
import { IGroupUser } from '../groupUser'
import { IVoucherUsage } from '../voucher'
import { ISession } from '../session'
import { IToken } from '..'

export interface IUser {
  id: string
  group_user_id: string
  role_name: ROLE_NAME
  email: string
  password: string
  is_active: boolean
  customer?: ICustomer
  employee?: IEmployee
  sessions: ISession[]
  tokens: IToken[]
  group_user: IGroupUser
  voucher_usages: IVoucherUsage[]
}
