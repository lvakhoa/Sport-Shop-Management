export interface IEventRequest {
  title?: string
  content?: string
  start_date?: Date
  end_date?: Date
  sale_percent?: number
  product_list?: {
    product_id: string
  }[]
  file?: File
}

export interface IEventResponse {
  id: string
  media_id?: string
  title: string
  content: string
  start_date: Date
  end_date: Date
  sale_percent: number
  product: {
    id: string
    event_id?: string
    name: string
    description?: string
    status: boolean
    list_price: string
    selling_price: string
  }[]
  media?: {
    url: string
  }
  total: number
}
