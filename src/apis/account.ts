import BaseApi from './base'

class AccountApi extends BaseApi {
  constructor() {
    super('/accounts')
  }

  async restoreAccount(fromDate?: number) {
    return super.restoreByDate(fromDate)
  }
}

const accountApi = new AccountApi()

export default accountApi
