import { GENDER } from '@/configs/enum'

export interface ICustomerRequest {
  fullname?: string
  phone?: string
  gender?: GENDER
  email?: string
  group_user_id?: string
}

export interface ICustomerResponse {
  id: string
  fullname: string
  phone?: string
  gender?: GENDER
  avatar_url?: string
  created_at: Date
  updated_at?: Date
  total: number
}
