import { IOrderCreateRequest, IOrderUpdateRequest, IOrderResponse } from '@/interfaces/order'
import BaseApi from './base'

class OrderApi extends BaseApi {
  constructor() {
    super('/orders')
  }

  async getAllOrders(count?: number, page?: number) {
    return super.getAll<IOrderResponse>(count, page)
  }

  async getOrderById(id: string) {
    return super.getById<IOrderResponse>(id)
  }

  async createOrder(order: IOrderCreateRequest) {
    return super.create(order)
  }

  async updateOrder(order: IOrderUpdateRequest, id: string) {
    return super.update(order, id)
  }

  async deleteOrderById(id: string) {
    return super.deleteById(id)
  }

  async deleteAllOrders() {
    return super.deleteAll()
  }
}

const orderApi = new OrderApi()

export default orderApi
