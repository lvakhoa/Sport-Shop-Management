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

export interface IShipmentResponse {
  id: string
  shipment_no: string
  order_id: string
  address_id?: string
  shipped: string
  shipped_date?: string
  completed_date?: string
  shipping_price: string
  shipment_tracking?: string
}
