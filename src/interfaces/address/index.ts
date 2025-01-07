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

interface TShipSuccessWrapper<T = null> {
  code: number
  message: string
  data: T
  message_display: string | null | undefined
}

export interface TProvinceResponse
  extends TShipSuccessWrapper<
    {
      ProvinceID: number
      ProvinceName: string
      CountryID: number
      Code: number
      NameExtension: string[]
    }[]
  > {}

export interface IDistrictResponse
  extends TShipSuccessWrapper<
    {
      DistrictID: number
      ProvinceID: number
      DistrictName: string
      Code: number
      Type: number
      SupportType: number
      NameExtension: string[]
    }[]
  > {}

export interface IWardResponse
  extends TShipSuccessWrapper<
    {
      WardCode: number
      DistrictID: number
      WardName: string
      NameExtension: string[]
    }[]
  > {}
