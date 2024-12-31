import { NOTIFICATION_TYPE } from '@/configs/enum'
import { ICustomer } from '../customer'

export interface INotificationRequest {
  account_id?: string
  role_id?: string
  type?: NOTIFICATION_TYPE
  notification_detail_id?: string
  body?: string
}

export interface INotification {
  id: string
  user_id: string
  reference_id?: string
  type: NOTIFICATION_TYPE
  content: string
  isRead: boolean
  user: ICustomer
}
