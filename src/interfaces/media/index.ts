import { GROUP_MEDIA_TYPE, MEDIA_TYPE } from '@/configs/enum'
import { IOrder } from '../order'
import { IStock } from '../stock'

export interface IMedia {
  id: string
  public_id: string
  url: string
  type: MEDIA_TYPE
  group_media_id: string
  group_media: IGroupMedia
}

export interface IGroupMedia {
  id: string
  type: GROUP_MEDIA_TYPE
  media_list: IMedia[]
  orders?: IOrder
  stocks: IStock
}
