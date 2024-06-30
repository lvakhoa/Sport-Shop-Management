import { GENDER } from '@/configs/enum'

export interface ICategoryResponse {
  id: string
  media_id?: string
  name: string
  type: string
  gender: string
  description?: string
  media?: {
    url: string
  }
  product_list: {
    product: {
      id: string
      name: string
    }
  }[]
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
