import { GROUP_VOUCHER_TYPE, VOUCHER_APPLICABLE_TYPE, VOUCHER_TYPE } from '@/configs/enum'
import { IUser } from '../users'
import { IOrder } from '../order'
import { IBrand } from '../brand'
import { ISport } from '../sport'
import { IProduct } from '../product'

export interface IVoucherRequest {
  group_voucher_id: string
  campaign_name: string
  title: string
  description?: string
  voucher_type: VOUCHER_TYPE
  voucher_value: number
  code: string
  starting_date: string
  ending_date: string
  total_quantity: number
  quantity_per_user: number
  minimum_price: number
  applicable_type: VOUCHER_APPLICABLE_TYPE
  is_active: boolean
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

export interface IVoucherTable {
  id: string
  group_voucher_name: string
  campaign_name: string
  title: string
  voucher_value: number
  code: string
  is_active: boolean
  starting_date: Date
  ending_date: Date
  total_quantity: number
  total: number
}

export interface IGroupVoucher {
  id: string
  name: string
  type: GROUP_VOUCHER_TYPE
  brand?: {
    id: string
    name: string
  }
  sport?: {
    id: string
    name: string
  }
}
