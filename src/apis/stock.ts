import { IStockRequest, IStockResponse, IBestSellerStock } from '@/interfaces/stock'
import BaseApi from './base'
import { handleResponse } from '@/helpers'
import { httpClient } from '@/services'

class StockApi extends BaseApi {
  constructor() {
    super('/stocks')
  }

  async getBestSeller(count?: number) {
    const data = await handleResponse<IBestSellerStock[]>(() =>
      httpClient.get<IBestSellerStock[]>(`/stocks/best-seller?count=${count}`),
    )
    return data
  }

  async getAllStock(count?: number, page?: number) {
    return super.getAll<IStockResponse>(count, page)
  }

  async getStockById(id: string) {
    return super.getById<IStockResponse>(id)
  }

  async createStock(stock: IStockRequest) {
    return super.create(stock)
  }

  async updateStock(stock: IStockRequest, id: string) {
    return super.update(stock, id)
  }

  async deleteStockById(id: string) {
    return super.deleteById(id)
  }

  async deleteAllStock() {
    return super.deleteAll()
  }
}

const stockApi = new StockApi()

export default stockApi
