import { GENDER } from '@/configs/enum'
import { IAddress } from '../address'
import { IUser } from '../users'
import { IOrder } from '../order'
import { IProduct, ISelectedProduct } from '../product'
import { INotification } from '../notification'

export interface ICustomerRequest {
  fullname?: string
  phone?: string
  gender?: GENDER
  email?: string
  group_user_id?: string
}

export interface ICustomer {
  id: string
  fullname: string
  phone?: string
  gender?: GENDER
  avatar_url?: string
  addresses: IAddress[]
  user: IUser
  notifications: INotification[]
  orders: IOrder[]
  selected_product: ISelectedProduct[]
  favorite_products: IProduct[]
  total: number
}
