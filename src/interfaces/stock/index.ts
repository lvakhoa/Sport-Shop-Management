import { SIZE } from '@/configs/enum'

export interface IStockRequest {
  product_id?: string
  color_id?: string
  size?: SIZE
  quantity_in_stock?: number
  file?: File
}

export interface IStockResponse {
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
  color: {
    name: string
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
