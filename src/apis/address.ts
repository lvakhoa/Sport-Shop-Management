import { IAddress, IDistrictResponse, IWardResponse, TProvinceResponse } from '@/interfaces/address'
import BaseApi from './base'
import { handleResponse } from '@/helpers'
import { httpClient } from '@/services'
import ghnClient from '@/services/ghnClient'

class AddressApi extends BaseApi {
  constructor() {
    super('/addresses')
  }

  async getAllAddress(count?: number, page?: number) {
    return super.getAll<IAddress>(count, page)
  }

  async getAddressById(id: string) {
    return super.getById<IAddress>(id)
  }

  async getAddressOfAccount(count?: number, page?: number) {
    const countQuery = !!count ? `?count=${count}` : ''
    const pageQuery = !!page ? `&page=${page}` : ''
    const data = await handleResponse<IAddress[]>(() =>
      httpClient.get<IAddress[]>('/addresses/account/' + countQuery + pageQuery),
    )
    return data
  }

  async restoreAddress(fromDate?: number) {
    return super.restoreByDate(fromDate)
  }

  async getProvinces() {
    const data = await handleResponse<TProvinceResponse>(() =>
      ghnClient.get<TProvinceResponse>('/shiip/public-api/master-data/province'),
    )
    return data?.data
  }

  async getDistricts() {
    const data = await handleResponse<IDistrictResponse>(() =>
      ghnClient.get<IDistrictResponse>('/shiip/public-api/master-data/district'),
    )
    return data?.data
  }

  async getWards(districtId: number) {
    const data = await handleResponse<IWardResponse>(() =>
      ghnClient.get<IWardResponse>('/shiip/public-api/master-data/ward', {
        params: {
          district_id: districtId,
        },
      }),
    )
    return data?.data
  }
}

const addressApi = new AddressApi()

export default addressApi
