import { SIZE } from '@/configs/enum'
import { IProduct, ISelectedProduct } from '../product'
import { IOrderedProduct } from '../order'
import { IGroupMedia } from '../media'

export interface IStockRequest {
  product_id?: string
  color_id?: string
  size?: SIZE
  quantity_in_stock?: string
  file?: File
}

export interface IStock {
  id: string
  name: string
  color: string
  size?: SIZE
  quantity: number
  is_active?: boolean
  group_media?: {
    media_list: {
      url: string
    }[]
  }
  product: {
    id: string
    name: string
    list_price: number
    selling_price: number
  }
  total: number
}

export interface IBestSellerStock {
  id: string
  product_id: string
  color_id?: string
  media_id?: string
  size?: SIZE
  quantity_in_stock: number
  product: {
    name: string
    list_price: string
    selling_price: string
  }
  media?: {
    url: string
  }
  color?: {
    name: string
  }
  _count: {
    order_details: number
  }
}
