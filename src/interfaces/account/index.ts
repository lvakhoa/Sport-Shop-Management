export interface ICustomerAccountRequest {
  email?: string
  password?: string
}

export interface IAccountResponse {
  id: string
  email: string
  role: {
    id: string
    title: string
  }
  employee?: {
    id: string
    fullname: string
  }
  customer?: {
    id: string
    fullname: string
  }
}

export interface IEmployeeAccountRequest {
  role_id?: string
  email?: string
  password?: string
}
