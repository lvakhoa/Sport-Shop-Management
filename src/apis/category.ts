import { ICategoryRequest, ICategoryResponse } from '@/interfaces/category'
import BaseApi from './base'

class CategoryApi extends BaseApi {
  constructor() {
    super('/categories')
  }

  async getAllCategories(count?: number, page?: number) {
    return super.getAll<ICategoryResponse>(count, page)
  }

  async getCategoryById(id: string) {
    return super.getById<ICategoryResponse>(id)
  }

  async createCategory(category: ICategoryRequest) {
    return super.create(category, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  async updateCategory(category: ICategoryRequest, id: string) {
    return super.update(category, id, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  async deleteCategoryById(id: string) {
    return super.deleteById(id)
  }

  async deleteAllCategories() {
    return super.deleteAll()
  }
}

const categoryApi = new CategoryApi()

export default categoryApi
