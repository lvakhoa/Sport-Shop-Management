import { ICustomer } from '../customer'

export interface IAddressRequest {
  street?: string
  ward?: string
  district?: string
  city?: string
  account_id?: string
}

export interface IAddress {
  id: string
  customer_id: string
  street: string
  ward: string
  district: string
  city: string
  customer: ICustomer
}
