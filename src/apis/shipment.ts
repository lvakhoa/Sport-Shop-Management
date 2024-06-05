import {
  IShipmentCreateRequest,
  IShipmentUpdateRequest,
  IShipmentResponse,
} from '@/interfaces/shipment'
import BaseApi from './base'

class ShipmentApi extends BaseApi {
  constructor() {
    super('/shipments')
  }

  async getAllShipments(count?: number, page?: number) {
    return super.getAll<IShipmentResponse>(count, page)
  }

  async getShipmentById(id: string) {
    return super.getById<IShipmentResponse>(id)
  }

  async createShipment(shipment: IShipmentCreateRequest) {
    return super.create(shipment)
  }

  async updateShipment(shipment: IShipmentUpdateRequest, id: string) {
    return super.update(shipment, id)
  }

  async deleteShipmentById(id: string) {
    return super.deleteById(id)
  }

  async deleteAllShipments() {
    return super.deleteAll()
  }
}

const shipmentApi = new ShipmentApi()

export default shipmentApi
