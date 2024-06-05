import { IEmployeeAccountRequest, IAccountResponse } from '@/interfaces/account'
import BaseApi from './base'

class EmployeeAccountApi extends BaseApi {
  constructor() {
    super('/accounts/employee')
  }

  async getAllEmployeeAccounts(count?: number, page?: number) {
    return super.getAll<IAccountResponse>(count, page)
  }

  async getEmployeeAccountById(id: string) {
    return super.getById<IAccountResponse>(id)
  }

  async createEmployeeAccount(account: IEmployeeAccountRequest) {
    return super.create(account)
  }

  async updateEmployeeAccount(account: IEmployeeAccountRequest, id: string) {
    return super.update(account, id)
  }

  async deleteEmployeeAccountById(id: string) {
    return super.deleteById(id)
  }

  async deleteAllEmployeeAccounts() {
    return super.deleteAll()
  }
}

const employeeAccountApi = new EmployeeAccountApi()

export default employeeAccountApi
