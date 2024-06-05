import { IEventRequest, IEventResponse } from '@/interfaces/event'
import BaseApi from './base'

class EventApi extends BaseApi {
  constructor() {
    super('/events')
  }

  async getAllEvents(count?: number, page?: number) {
    return super.getAll<IEventResponse>(count, page)
  }

  async getEventById(id: string) {
    return super.getById<IEventResponse>(id)
  }

  async createEvent(event: IEventRequest) {
    return super.create(event)
  }

  async updateEvent(event: IEventRequest, id: string) {
    return super.update(event, id)
  }

  async deleteEventById(id: string) {
    return super.deleteById(id)
  }

  async deleteAllEvents() {
    return super.deleteAll()
  }
}

const eventApi = new EventApi()

export default eventApi
