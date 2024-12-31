import { GENDER } from '@/configs/enum'
import { IUser } from '../users'
import { IOrder } from '../order'

export interface IEmployeeRequest {
  fullname?: string
  phone?: string
  gender?: GENDER
  email?: string
  group_user_id?: string
}

export interface IEmployee {
  id: string
  fullname: string
  phone?: string
  gender?: GENDER
  user: IUser
  confirmed_orders: IOrder[]
  total: number
}
