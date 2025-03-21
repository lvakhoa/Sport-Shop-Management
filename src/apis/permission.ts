import { IPermissionRequest, IPermission } from '@/interfaces/permission'
import BaseApi from './base'

class PermissionApi extends BaseApi {
  constructor() {
    super('/permissions')
  }

  async getAllPermission(count?: number, page?: number) {
    return super.getAll<IPermission>(count, page)
  }

  async getPermissionById(id: string) {
    return super.getById<IPermission>(id)
  }

  async createPermission(permission: IPermissionRequest) {
    return super.create(permission)
  }

  async updatePermission(permission: IPermissionRequest, id: string) {
    return super.update(permission, id)
  }

  async deletePermissionById(id: string) {
    return super.deleteById(id)
  }

  async deleteAllPermissions() {
    return super.deleteAll()
  }
}

const permissionApi = new PermissionApi()

export default permissionApi
