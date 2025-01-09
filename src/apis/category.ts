import { ICategoryRequest, ICategory } from '@/interfaces/category'
import BaseApi from './base'

class CategoryApi extends BaseApi {
  constructor() {
    super('/categories')
  }

  async getAllCategories(
    count?: number,
    page?: number,
    consumer_type?: string,
    parent_category_id?: string,
  ) {
    return super.getAll<ICategory>(count, page, {
      consumer_type,
      parent_category_id,
    })
  }

  async getCategoryById(id: string) {
    return super.getById<ICategory>(id)
  }

  async createCategory(category: ICategoryRequest) {
    return super.create(category, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  async updateCategory(category: Partial<ICategoryRequest>, id: string) {
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

  async restoreCategory(fromDate?: number) {
    return super.restoreByDate(fromDate)
  }
}

const categoryApi = new CategoryApi()

export default categoryApi
