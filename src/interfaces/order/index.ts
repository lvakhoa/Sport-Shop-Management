import { ORDER_STATUS, PAYMENT_TYPE } from '@/configs/enum'
import { IEmployee } from '../employee'
import { ICustomer } from '../customer'
import { IVoucher } from '../voucher'
import { IStock } from '../stock'
import { IGroupMedia } from '../media'
import { IShipment } from '../shipment'

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
