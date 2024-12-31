import { IBrand } from '../brand'
import { ISport } from '../sport'
import { ICategory } from '../category'
import { ICustomer } from '../customer'
import { IGroupVoucher } from '../voucher'
import { IStock } from '../stock'

export interface IProductRequest {
  name?: string
  description?: string
  status?: boolean
  list_price?: number
  selling_price?: number
  category_list?: {
    category_id: string
  }[]
}

export interface IProduct {
  id: string
  brand_id: string
  sport_id: string
  name: string
  description?: string
  list_price: number
  selling_price: number
  weight: number
  is_active: boolean
  brand: IBrand
  sport: ISport
  stocks: IStock[]
  categories: ICategory[]
  liked_customers: ICustomer[]
  group_vouchers: IGroupVoucher[]
  total: number
}

export interface ISelectedProduct {
  customer_id: string
  stock_id: string
  quantity: number
  customer: ICustomer
  stock: IStock
}
