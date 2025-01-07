import {
  IOrderCreateRequest,
  IOrderUpdateRequest,
  IOrder,
  IShipmentTracking,
  ICalcOrderFeeRequest,
  ICalcOrderFeeResponse,
  IAllOrdersResponse,
} from '@/interfaces/order'
import BaseApi from './base'
import { ORDER_STATUS } from '@/configs/enum'
import { httpClient } from '@/services'
import { handleResponse } from '@/helpers'

class OrderApi extends BaseApi {
  constructor() {
    super('/orders')
  }

  async getAllOrders(
    count?: number,
    page?: number,
    fromDate?: number,
    toDate?: number,
    orderStatus?: ORDER_STATUS,
  ) {
    const dateRangeQuery =
      !!fromDate && !!toDate
        ? !!count || !!page
          ? `&fromDate=${fromDate}&toDate=${toDate}`
          : `?fromDate=${fromDate}&toDate=${toDate}`
        : ''

    const optionalQuery = !!orderStatus
      ? !!dateRangeQuery
        ? `${dateRangeQuery}&status=${orderStatus}`
        : !!count || !!page
          ? `&status=${orderStatus}`
          : `?status=${orderStatus}`
      : dateRangeQuery
    return super.getAll<IAllOrdersResponse>(count, page, {
      fromDate,
      toDate,
      orderStatus,
    })
  }

  async getOrderById(id: string) {
    return super.getById<IOrder>(id)
  }

  async createOrder(order: IOrderCreateRequest) {
    const data = await handleResponse<{ message: string; order_id: string }>(() =>
      httpClient.post<{ message: string; order_id: string }>(this.route + '/employee', order),
    )
    return data
  }

  async updateOrder(order: Partial<IOrderUpdateRequest>, id: string) {
    return super.update(order, id)
  }

  async deleteOrderById(id: string) {
    return super.deleteById(id)
  }

  async deleteAllOrders() {
    return super.deleteAll()
  }

  async getShipmentTracking(orderCode: string) {
    const data = await handleResponse<IShipmentTracking>(() =>
      httpClient.get<IShipmentTracking>(this.route + `/${orderCode}/shipment-tracking`),
    )
    return data
  }

  async calculateShippingFee(body: ICalcOrderFeeRequest) {
    const data = await handleResponse<ICalcOrderFeeResponse>(() =>
      httpClient.post<ICalcOrderFeeResponse>(this.route + '/shipping-fee', body),
    )
    return data?.fee
  }
}

const orderApi = new OrderApi()

export default orderApi
