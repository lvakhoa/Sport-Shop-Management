import { IBrandCreate, IBrand, IBrandUpdate } from '@/interfaces/brand'
import BaseApi from './base'

class BrandApi extends BaseApi {
  constructor() {
    super('/brands')
  }

  async getAllBrands(count?: number, page?: number) {
    return super.getAll<IBrand>(count, page)
  }

  async getBrandById(id: string) {
    return super.getById<IBrand>(id)
  }

  async createBrand(brand: IBrandCreate) {
    const formData = new FormData()
    Object.entries(brand).forEach(([key, value]) => {
      if (key === 'file') {
        formData.append(key, value)
      } else {
        formData.append(key, value as string)
      }
    })

    return super.create(formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  async updateBrand(brand: IBrandUpdate, id: string) {
    const formData = new FormData()
    Object.entries(brand).forEach(([key, value]) => {
      if (key === 'file') {
        formData.append(key, value)
      } else {
        formData.append(key, value as string)
      }
    })

    return super.update(formData, id, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  async deleteBrandById(id: string) {
    return super.deleteById(id)
  }

  async deleteAllBrands() {
    return super.deleteAll()
  }

  async restoreBrand(fromDate?: number) {
    return super.restoreByDate(fromDate)
  }
}

const brandApi = new BrandApi()

export default brandApi
