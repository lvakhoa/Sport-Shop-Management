export interface IPerson {
  id: string
  fullname: string
  phone: string
  email: string
  gender: 'MALE' | 'FEMALE'
  rank: 'GOLD' | 'SILVER' | 'COPPER'
  loyalty_point: number
}

export interface ITokenResponse {
  access_token: string
  refresh_token: string
}
