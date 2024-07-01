import { IAddressResponse } from '@/interfaces/address'
import BaseApi from './base'
import { handleResponse } from '@/helpers'
import { httpClient } from '@/services'

class AddressApi extends BaseApi {
  constructor() {
    super('/addresses')
  }

  async getAllAddress(count?: number, page?: number) {
    return super.getAll<IAddressResponse>(count, page)
  }

  async getAddressById(id: string) {
    return super.getById<IAddressResponse>(id)
  }

  async getAddressOfAccount(count?: number, page?: number) {
    const countQuery = !!count ? `?count=${count}` : ''
    const pageQuery = !!page ? `&page=${page}` : ''
    const data = await handleResponse<IAddressResponse[]>(() =>
      httpClient.get<IAddressResponse[]>('/addresses/account/' + countQuery + pageQuery),
    )
    return data
  }

  async restoreAddress(fromDate?: number) {
    return super.restoreByDate(fromDate)
  }
}

const addressApi = new AddressApi()

export default addressApi
