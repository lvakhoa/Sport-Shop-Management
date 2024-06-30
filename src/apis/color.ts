import { IColorResponse } from '@/interfaces/color'
import BaseApi from './base'

class ColorApi extends BaseApi {
  constructor() {
    super('/colors')
  }

  async getAllColors() {
    return super.getAll<IColorResponse>()
  }

  async getColorById(id: string) {
    return super.getById<IColorResponse>(id)
  }
}

const colorApi = new ColorApi()

export default colorApi
