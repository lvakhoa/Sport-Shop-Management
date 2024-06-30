import { ICustomerRequest, ICustomerResponse } from '@/interfaces/customer'
import BaseApi from './base'

class CustomerApi extends BaseApi {
  constructor() {
    super('/customers')
  }

  async getAllCustomers(count?: number, page?: number) {
    return super.getAll<ICustomerResponse>(count, page)
  }

  async getCustomerById(id: string) {
    return super.getById<ICustomerResponse>(id)
  }

  async createCustomer(customer: ICustomerRequest) {
    return super.create(customer)
  }

  async updateCustomer(customer: ICustomerRequest, id: string) {
    return super.update(customer, id)
  }

  async deleteCustomerById(id: string) {
    return super.deleteById(id)
  }

  async deleteAllCustomers() {
    return super.deleteAll()
  }

  async restoreCustomer(fromDate?: number) {
    return super.restoreByDate(fromDate)
  }
}

const customerApi = new CustomerApi()

export default customerApi
