export interface IInvoiceRequest {
  transaction_id?: string
  employee_created_id?: string
}

export interface IInvoiceResponse {
  id: string
  invoice_no: string
  transaction_id: string
  employee_created_id?: string
}
