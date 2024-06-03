import { SHIPPING_LOCATION } from '@/configs/enum'

export interface IShippingPriceRequest {
  price: number
}

export interface IShippingPriceResponse {
  id: string
  type: SHIPPING_LOCATION
  price: string
}
