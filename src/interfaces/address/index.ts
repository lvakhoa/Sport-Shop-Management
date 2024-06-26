export interface IAddressRequest {
  street?: string
  ward?: string
  district?: string
  city?: string
  account_id?: string
}

export interface IAddressResponse {
  id: string
  account_id: string
  street: string
  ward: string
  district: string
  city: string
}
