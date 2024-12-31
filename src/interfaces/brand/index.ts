import { IProduct } from '../product'
import { IGroupVoucher } from '../voucher'

export interface IBrand {
  id: string
  name: string
  description?: string
  logo_url: string
  is_active: boolean
  group_vouchers: IGroupVoucher[]
  products: IProduct[]
  total: number
}
