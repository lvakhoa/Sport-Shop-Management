import { IShippingPriceRequest, IShippingPriceResponse } from '@/interfaces/shipping-price'
import BaseApi from './base'

class ShippingPriceApi extends BaseApi {
  constructor() {
    super('/shipping-price')
  }

  async getAllShippingPrice(count?: number, page?: number) {
    return super.getAll<IShippingPriceResponse>(count, page)
  }

  async getShippingPriceById(id: string) {
    return super.getById<IShippingPriceResponse>(id)
  }

  async updateShippingPrice(shippingPrice: IShippingPriceRequest, id: string) {
    return super.update(shippingPrice, id)
  }
}

const shippingPriceApi = new ShippingPriceApi()

export default shippingPriceApi
