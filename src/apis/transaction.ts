import {
  ITransactionCreateRequest,
  ITransactionUpdateRequest,
  ITransactionResponse,
} from '@/interfaces/transaction'
import BaseApi from './base'
import { handleResponse } from '@/helpers'
import { httpClient } from '@/services'

class TransactionApi extends BaseApi {
  constructor() {
    super('/transactions')
  }

  async getTotalIncome(fromDate?: number, toDate?: number) {
    const data = await handleResponse<
      { total_income: string } | { total_income: string; date: Date }[]
    >(() => {
      const fromDateQuery = !!fromDate ? `?fromDate=${fromDate}` : ''
      const toDateQuery = !!toDate ? (!!fromDate ? `&toDate=${toDate}` : `?toDate=${toDate}`) : ''
      const url = this.route + '/income' + fromDateQuery + toDateQuery

      return httpClient.get<{ total_income: string } | { total_income: string; date: Date }[]>(url)
    })
    return data
  }

  async getAllTransactions(count?: number, page?: number) {
    return super.getAll<ITransactionResponse>(count, page)
  }

  async getTransactionById(id: string) {
    return super.getById<ITransactionResponse>(id)
  }

  async createTransaction(transaction: ITransactionCreateRequest) {
    return super.create(transaction)
  }

  async updateTransaction(transaction: ITransactionUpdateRequest, id: string) {
    return super.update(transaction, id)
  }

  async deleteTransactionById(id: string) {
    return super.deleteById(id)
  }

  async deleteAllTransactions() {
    return super.deleteAll()
  }
}

const transactionApi = new TransactionApi()

export default transactionApi
