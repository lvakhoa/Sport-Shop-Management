import { GROUP_VOUCHER_TYPE, VOUCHER_APPLICABLE_TYPE, VOUCHER_TYPE } from '@/configs/enum'
import { IUser } from '../users'
import { IOrder } from '../order'
import { IBrand } from '../brand'
import { ISport } from '../sport'
import { IProduct } from '../product'

export interface IVoucherRequest {
  title?: string
  code?: string
  sale_percent?: number
  quantity?: number
  expired_date?: Date
}

export interface IVoucherUsage {
  voucher_id: string
  user_id: string
  quantity: number
  user: IUser
  voucher: IVoucher
}

export interface IVoucher {
  id: string
  group_voucher_id: string
  campaign_name: string
  title: string
  description?: string
  voucher_type: VOUCHER_TYPE
  voucher_value: number
  code: string
  is_active: boolean
  starting_date: Date
  ending_date: Date
  total_quantity: number
  quantity_per_user: number
  minimum_price: number
  applicable_type: VOUCHER_APPLICABLE_TYPE
  orders: IOrder[]
  group_voucher: IGroupVoucher
  voucher_usages: IVoucherUsage[]
  total: number
}

export interface IGroupVoucher {
  id: string
  brand_id?: string
  sport_id?: string
  type: GROUP_VOUCHER_TYPE
  brand?: IBrand
  sport: ISport
  vouchers: IVoucher[]
  products: IProduct[]
}
