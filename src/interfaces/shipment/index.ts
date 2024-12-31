import { ICustomer } from '../customer'
import { IOrder } from '../order'
import { IStock } from '../stock'

export interface IShipmentCreateRequest {
  order_id?: string
  address_id?: string
  shipping_price?: number
}

export interface IShipmentUpdateRequest {
  order_id?: string
  address_id?: string
  shipping_price?: number
  shipped?: boolean
  shipped_date?: Date
  completed_date?: Date
  shipment_tracking?: string
}

export interface IShipment {
  id: string
  order_id: string
  carrier_name: string
  carrier_logo_url: string
  service_name: string
  service_description: string
  shipped_date?: Date
  completed_date?: Date
  shipping_fee: number
  shipment_tracking?: string
  shipping_address: string
  order: IOrder
}
