import { INotificationRequest, INotificationResponse } from '@/interfaces/notification'
import BaseApi from './base'

class NotificationApi extends BaseApi {
  constructor() {
    super('/notifications')
  }

  async getAllNotification(count?: number, page?: number) {
    return super.getAll<INotificationResponse>(count, page)
  }

  async getNotificationById(id: string) {
    return super.getById<INotificationResponse>(id)
  }

  async createNotification(notification: INotificationRequest) {
    return super.create(notification)
  }

  async updateNotification(notification: INotificationRequest, id: string) {
    return super.update(notification, id)
  }

  async deleteNotificationById(id: string) {
    return super.deleteById(id)
  }

  async deleteAllNotifications() {
    return super.deleteAll()
  }

  async restoreNotification(fromDate?: number) {
    return super.restoreByDate(fromDate)
  }
}

const notificationApi = new NotificationApi()

export default notificationApi
