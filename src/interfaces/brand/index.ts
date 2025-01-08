import { IProduct } from '../product'
import { IGroupVoucher } from '../voucher'

export interface IBrand {
  id: string
  name: string
  description?: string
  logo_url: string
  is_active: boolean
  products: {
    id: string
    name: string
  }
  total: number
}

export interface IBrandCreate {
  name: string
  description?: string
  file: File | null | undefined
  is_active: boolean
}

export interface IBrandUpdate extends Partial<IBrandCreate> {}
