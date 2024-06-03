export interface IVoucherRequest {
  title?: string
  code?: string
  sale_percent?: number
  quantity?: number
  expired_date?: Date
}

export interface IVoucherResponse {
  id: string
  title: string
  code: string
  sale_percent: number
  quantity: number
  expired_date: Date
}
