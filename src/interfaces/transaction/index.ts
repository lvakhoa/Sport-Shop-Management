import { PAYMENT_TYPE, TRANSACTION_STATUS } from '@/configs/enum'

export interface ITransactionCreateRequest {
  order_id: string
  payment_type: PAYMENT_TYPE
  total_price: number
}

export interface ITransactionUpdateRequest {
  order_id?: string
  payment_type?: PAYMENT_TYPE
  total_price?: number
  status?: TRANSACTION_STATUS
  payment_time?: Date
  employee_created_id?: string
}

export interface ITransactionResponse {
  id: string
  transaction_no: string
  payment_type: PAYMENT_TYPE
  order_id: string
  status: TRANSACTION_STATUS
  payment_time?: Date
  total_price: string
}
