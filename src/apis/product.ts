import { IProductRequest, IProductResponse } from '@/interfaces/product'
import BaseApi from './base'

class ProductApi extends BaseApi {
  constructor() {
    super('/products')
  }

  async getAllProduct(count?: number, page?: number) {
    return super.getAll<IProductResponse>(count, page)
  }

  async getProductById(id: string) {
    return super.getById<IProductResponse>(id)
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
}

const productApi = new ProductApi()

export default productApi
