import { IEmployeeRequest, IEmployeeResponse } from '@/interfaces/employee'
import BaseApi from './base'

class EmployeeApi extends BaseApi {
  constructor() {
    super('/employees')
  }

  async getAllEmployees(count?: number, page?: number) {
    return super.getAll<IEmployeeResponse>(count, page)
  }

  async getEmployeesById(id: string) {
    return super.getById<IEmployeeResponse>(id)
  }

  async createEmployee(employee: IEmployeeRequest) {
    return super.create(employee)
  }

  async updateEmployee(employee: IEmployeeRequest, id: string) {
    return super.update(employee, id)
  }

  async deleteEmployeeById(id: string) {
    return super.deleteById(id)
  }

  async deleteAllEmployees() {
    return super.deleteAll()
  }
}

const employeeApi = new EmployeeApi()

export default employeeApi
