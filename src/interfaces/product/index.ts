import { IBrand } from '../brand'
import { ISport } from '../sport'
import { ICategory } from '../category'
import { ICustomer } from '../customer'
import { IGroupVoucher } from '../voucher'
import { IStock } from '../stock'
import { MEDIA_TYPE, SIZE } from '@/configs/enum'

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
  name: string
  description?: string
  list_price: number
  selling_price: number
  weight: number
  is_active: boolean
  brand: {
    id: string
    name: string
    logo_url: string
  }
  sport: {
    id: string
    name: string
    logo_url: string
  }
  categories: ICategory[]
  stocks: {
    id: string
    color: string
    name: string
    size?: SIZE
    quantity: number
    group_media: {
      id: true
      media_list: {
        id: string
        type: MEDIA_TYPE
        url: string
      }[]
    }
  }[]
  total: number
}

export interface IProductDisplay {
  id: string
  name: string
  brand: string
  sport: string
  isActive: boolean
  category: string
  listPrice: number
  sellingPrice: number
  total: number
}

export interface ISelectedProduct {
  customer_id: string
  stock_id: string
  quantity: number
  customer: ICustomer
  stock: IStock
}
