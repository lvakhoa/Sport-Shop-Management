import { ICustomerAccountRequest, IAccountResponse } from '@/interfaces/account'
import BaseApi from './base'

class CustomerAccountApi extends BaseApi {
  constructor() {
    super('/accounts/customer')
  }

  async getAllCustomerAccounts(count?: number, page?: number) {
    return super.getAll<IAccountResponse>(count, page)
  }

  async getCustomerAccountById(id: string) {
    return super.getById<IAccountResponse>(id)
  }

  async createCustomerAccount(account: ICustomerAccountRequest) {
    return super.create(account)
  }

  async updateCustomerAccount(account: ICustomerAccountRequest, id: string) {
    return super.update(account, id)
  }

  async deleteCustomerAccountById(id: string) {
    return super.deleteById(id)
  }

  async deleteAllCustomerAccounts() {
    return super.deleteAll()
  }
}

const customerAccountApi = new CustomerAccountApi()

export default customerAccountApi
