import { FILTER_INPUT_TYPE, STATUS } from '@/configs/enum'

export interface IPerson {
  id: string
  fullname: string
  phone: string
  email: string
  gender: 'MALE' | 'FEMALE'
  rank: 'GOLD' | 'SILVER' | 'COPPER'
  loyalty_point: number
}

export interface ITokenResponse {
  access_token: string
  refresh_token: string
}

export interface IInfo {
  fullname?: string
  phone?: string
  gender?: 'MALE' | 'FEMALE'
}

export interface IFilterInput {
  key: string
  title: string
  type: FILTER_INPUT_TYPE
  dropdownItems?: string[]
}
