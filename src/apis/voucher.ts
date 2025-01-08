import { IVoucherRequest, IVoucher, IGroupVoucher } from '@/interfaces/voucher'
import BaseApi from './base'
import { handleResponse } from '@/helpers'
import { httpClient } from '@/services'

class VoucherApi extends BaseApi {
  constructor() {
    super('/vouchers')
  }

  async getAllVouchers(count?: number, page?: number) {
    return super.getAll<IVoucher>(count, page)
  }

  async getVoucherById(id: string) {
    return super.getById<IVoucher>(id)
  }

  async getAllGroupVouchers() {
    const data = await handleResponse<IGroupVoucher[]>(() => {
      return httpClient.get<IGroupVoucher[]>(this.route + '/groups')
    })
    return data
  }

  async createVoucher(voucher: IVoucherRequest) {
    return super.create(voucher)
  }

  async updateVoucher(voucher: Partial<IVoucherRequest>, id: string) {
    return super.update(voucher, id)
  }

  async deleteVoucherById(id: string) {
    return super.deleteById(id)
  }

  async deleteAllVouchers() {
    return super.deleteAll()
  }

  async restoreVoucher(fromDate?: number) {
    return super.restoreByDate(fromDate)
  }
}

const voucherApi = new VoucherApi()

export default voucherApi
