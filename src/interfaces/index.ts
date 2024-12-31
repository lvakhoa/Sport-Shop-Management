import { FILTER_INPUT_TYPE, TOKEN_TYPE } from '@/configs/enum'
import { IUser } from './users'

export interface IPerson {
  id: string
  fullname: string
  phone: string
  email: string
  gender: 'MALE' | 'FEMALE'
  rank: 'GOLD' | 'SILVER' | 'COPPER'
  loyalty_point: number
}

export interface IToken {
  token: string
  type: TOKEN_TYPE
  expired_date?: Date
  user_id: string
  user: IUser
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
