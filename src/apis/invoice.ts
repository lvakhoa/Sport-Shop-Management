import { IInvoiceRequest, IInvoiceResponse } from '@/interfaces/invoice'
import BaseApi from './base'

class InvoiceApi extends BaseApi {
  constructor() {
    super('/invoices')
  }

  async getAllInvoices(count?: number, page?: number) {
    return super.getAll<IInvoiceResponse>(count, page)
  }

  async getInvoiceById(id: string) {
    return super.getById<IInvoiceResponse>(id)
  }

  async createEvent(invoice: IInvoiceRequest) {
    return super.create(invoice)
  }

  async updateEvent(invoice: IInvoiceRequest, id: string) {
    return super.update(invoice, id)
  }

  async deleteEventById(id: string) {
    return super.deleteById(id)
  }

  async deleteAllEvent() {
    return super.deleteAll()
  }

  async restoreInvoice(fromDate?: number) {
    return super.restoreByDate(fromDate)
  }
}

const invoiceApi = new InvoiceApi()

export default invoiceApi
