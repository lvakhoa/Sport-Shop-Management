import { CONSUMER_TYPE } from '@/configs/enum'
import { IProduct } from '../product'

export interface ICategory {
  id: string
  parent_id?: string
  name: string
  consumer_type: CONSUMER_TYPE
  description?: string
  image_url?: string
  is_active: boolean
  parent_category?: ICategory
  child_categories: ICategory[]
  products: IProduct[]
  total: number
}

export interface ICategoryRequest {
  name?: string
  type?: string
  gender?: 'MALE' | 'FEMALE'
  description?: string
  product_list?: {
    product_id: string
  }[]
  file?: File
}
