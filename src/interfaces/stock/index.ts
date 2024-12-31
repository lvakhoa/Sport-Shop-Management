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
  product_id: string
  group_media_id?: string
  name: string
  color: string
  size?: SIZE
  quantity: number
  is_active: boolean
  ordered_product: IOrderedProduct[]
  selected_product: ISelectedProduct[]
  group_media?: IGroupMedia
  product: IProduct
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
