import { SIZE } from '@/configs/enum'

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

export interface IProductResponse {
  id: string
  event_id?: string
  name: string
  description?: string
  status: boolean
  list_price: string
  selling_price: string
  total: number
  stocks: {
    media?: {
      url: string
    }
    color?: {
      name: string
    }
    size?: SIZE
    quantity_in_stock: number
  }[]
  category_list: {
    category: {
      id: string
      name: string
    }
  }[]
}
