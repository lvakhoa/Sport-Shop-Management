import { ORDER_STATUS, PAYMENT_TYPE } from '@/configs/enum'
import { IEmployee } from '../employee'
import { ICustomer } from '../customer'
import { IVoucher } from '../voucher'
import { IStock } from '../stock'
import { IGroupMedia } from '../media'
import { IShipment } from '../shipment'

export interface IOrderCreateRequest {
  customer_id: string
  product_total_price: number
  order_details: {
    stock_id: string
    quantity: number
  }[]
  payment_type?: PAYMENT_TYPE
  shipment: {
    shipping_fee: number
    shipping_address: string
  }
}

export interface IOrderUpdateRequest {
  account_id: string
  customer_id: string
  confirmed_employee_id: string
  product_total_price: number
  status: ORDER_STATUS
  buy_in_app: boolean
}

export interface IOrder {
  id: string
  order_code: string
  customer_id: string
  confirming_employee_id?: string
  voucher_id?: string
  group_media_id?: string
  product_total_price: number
  order_date: Date
  status: ORDER_STATUS
  payment_type: PAYMENT_TYPE
  payment_time?: Date
  review_star: number
  review_content?: string
  confirmed_employee?: IEmployee
  customer: ICustomer
  group_media?: IGroupMedia
  voucher?: IVoucher
  ordered_products: IOrderedProduct[]
  shipment?: IShipment
  total: number
}

export interface IOrderedProduct {
  order_id: string
  stock_id: string
  quantity: number
  order: IOrder
  stock: IStock
  total: number
}

export interface IShipmentTracking {
  tracking_logs: {
    order_code: string
    status: string
    status_name: string
    location: {
      address: string
      ward_code: string
      district_id: number
      warehouse_id: number
    }
    executor: {
      client_id: number
      name: string
      phone: string
    }
    action_at: string
    sync_data_at: string | null
  }[]
}

export interface ICalcOrderFeeRequest {
  to_ward_code: string
  to_district_id: string
  order_details: {
    stock_id: string
    quantity: number
  }[]
}

export interface ICalcOrderFeeResponse {
  fee: number
}
