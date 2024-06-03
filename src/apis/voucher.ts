import { IVoucherRequest, IVoucherResponse } from '@/interfaces/voucher'
import BaseApi from './base'

class VoucherApi extends BaseApi {
  constructor() {
    super('/vouchers')
  }

  async getAllVouchers(count?: number, page?: number) {
    return super.getAll<IVoucherResponse>(count, page)
  }

  async getVoucherById(id: string) {
    return super.getById<IVoucherResponse>(id)
  }

  async createVoucher(voucher: IVoucherRequest) {
    return super.create(voucher)
  }

  async updateVoucher(voucher: IVoucherRequest, id: string) {
    return super.update(voucher, id)
  }

  async deleteVoucherById(id: string) {
    return super.deleteById(id)
  }

  async deleteAllVouchers() {
    return super.deleteAll()
  }
}

const voucherApi = new VoucherApi()

export default voucherApi
