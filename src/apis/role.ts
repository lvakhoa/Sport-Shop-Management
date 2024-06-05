import { IRoleRequest, IRoleResponse } from '@/interfaces/role'
import BaseApi from './base'

class RoleApi extends BaseApi {
  constructor() {
    super('/roles')
  }

  async getAllRoles(count?: number, page?: number) {
    return super.getAll<IRoleResponse>(count, page)
  }

  async getRoleById(id: string) {
    return super.getById<IRoleResponse>(id)
  }

  async createRole(role: IRoleRequest) {
    return super.create(role)
  }

  async updateRole(role: IRoleRequest, id: string) {
    return super.update(role, id)
  }

  async deleteRoleById(id: string) {
    return super.deleteById(id)
  }

  async deleteAllRoles() {
    return super.deleteAll()
  }
}

const roleApi = new RoleApi()

export default roleApi
