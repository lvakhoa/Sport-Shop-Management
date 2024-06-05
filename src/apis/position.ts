import { IPositionRequest, IPositionResponse } from '@/interfaces/position'
import BaseApi from './base'

class PositionApi extends BaseApi {
  constructor() {
    super('/positions')
  }

  async getAllPositions(count?: number, page?: number) {
    return super.getAll<IPositionResponse>(count, page)
  }

  async getPositionById(id: string) {
    return super.getById<IPositionResponse>(id)
  }

  async createPosition(position: IPositionRequest) {
    return super.create(position)
  }

  async updatePosition(position: IPositionRequest, id: string) {
    return super.update(position, id)
  }

  async deletePositionById(id: string) {
    return super.deleteById(id)
  }

  async deleteAllPositions() {
    return super.deleteAll()
  }
}

const positionApi = new PositionApi()

export default positionApi
