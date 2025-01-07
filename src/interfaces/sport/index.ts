import { IProduct } from '../product'
import { IGroupVoucher } from '../voucher'

export interface ISport {
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

export interface ISportCreate {
  name: string
  description?: string
  file: File
}

export interface ISportUpdate extends Partial<ISportCreate> {
  is_active?: boolean
}
