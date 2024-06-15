import { ORDER_STATUS, PAYMENT_TYPE, SIZE } from '@/configs/enum'

export interface IOrderCreateRequest {
  account_id?: string
  customer_id?: string
  product_total_price?: number
  status?: ORDER_STATUS
  buy_in_app?: boolean
  note?: string
  order_details?: {
    product_stock_id: string
    quantity: number
  }[]
  address_id?: string
  shipping_price?: number
  payment_type?: PAYMENT_TYPE
  voucher_id?: string
}

export interface IOrderUpdateRequest {
  account_id: string
  customer_id: string
  confirmed_employee_id: string
  product_total_price: number
  status: ORDER_STATUS
  buy_in_app: boolean
}

export interface IOrderResponse {
  id: string
  order_no: string
  account_id: string
  customer_id: string
  confirmed_employee_id: string
  voucher_id?: string
  product_total_price: string
  order_date: Date
  status: ORDER_STATUS
  buy_in_app: boolean
  note?: string
  voucher?: {
    code: string
    sale_percent: number
  }
  order_details: {
    stock: {
      id: string
      product_id: string
      color_id?: string
      media_id?: string
      size?: SIZE
      quantity_in_stock: number
      product: {
        id: string
        event_id: string
        name: string
        description: string
        status: boolean
        list_price: string
        selling_price: string
      }
      media?: {
        url: string
      }
      color?: {
        name: string
      }
    }
    quantity: number
  }[]
  shipment: {
    id: string
    shipment_no: string
    order_id: string
    address_id?: string
    shipped: boolean
    shipped_date?: Date
    completed_date?: Date
    shipping_price: string
    shipment_tracking?: string
    address?: {
      id: string
      account_id: string
      street: string
      ward: string
      district: string
      city: string
    }
  }
  total: number
}
