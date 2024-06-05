import { NOTIFICATION_TYPE } from '@/configs/enum'

export interface INotificationRequest {
  account_id?: string
  role_id?: string
  type?: NOTIFICATION_TYPE
  notification_detail_id?: string
  body?: string
}

export interface INotificationResponse {
  id: string
  account_id?: string
  role_id: string
  type: NOTIFICATION_TYPE
  notification_detail_id: string
  created_at: Date
  body: string
}
