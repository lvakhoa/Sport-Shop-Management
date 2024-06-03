import { GENDER, RANK } from '@/configs/enum'

export interface ICustomerRequest {
  account_id?: string
  fullname?: string
  phone?: string
  email?: string
  gender?: GENDER
  rank?: RANK
  loyalty_point?: number
}

export interface ICustomerResponse {
  id: string
  account_id?: string
  fullname: string
  phone: string
  email: string
  gender: GENDER
  rank: RANK
  loyalty_point: number
}
