import { IProductRequest, IProduct } from '@/interfaces/product'
import BaseApi from './base'
import { handleResponse } from '@/helpers'
import { httpClient } from '@/services'

class ProductApi extends BaseApi {
  constructor() {
    super('/products')
  }

  async getAllProduct(count?: number, page?: number, categoryId?: string) {
    return super.getAll<IProduct>(count, page, {
      categoryId,
    })
  }

  async getProductById(id: string) {
    return super.getById<IProduct>(id)
  }

  async createProduct(product: IProductRequest) {
    return super.create(product)
  }

  async updateProduct(product: IProductRequest, id: string) {
    return super.update(product, id)
  }

  async deleteProductById(id: string) {
    return super.deleteById(id)
  }

  async deleteAllProducts() {
    return super.deleteAll()
  }

  async searchProduct(text: string, count?: number, page?: number) {
    const data = await handleResponse<IProduct[]>(() =>
      httpClient.get<IProduct[]>('/products/search', {
        params: {
          text,
          count,
          page,
        },
      }),
    )
    return data
  }

  async restoreProduct(fromDate?: number) {
    return super.restoreByDate(fromDate)
  }
}

const productApi = new ProductApi()

export default productApi
