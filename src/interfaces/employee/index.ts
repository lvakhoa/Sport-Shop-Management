import { GENDER, POSITION_TITLE } from '@/configs/enum'

export interface IEmployeeRequest {
  account_id?: string
  position_id?: string
  fullname?: string
  phone?: string
  email?: string
  gender?: 'MALE' | 'FEMALE'
  started_date?: string
  salary?: number
}

export interface IEmployeeResponse {
  id: string
  account_id?: string
  position_id?: string
  fullname: string
  phone: string
  email: string
  gender: GENDER
  started_date: Date
  salary: string
  total: number
  position?: {
    title: POSITION_TITLE
  }
}
