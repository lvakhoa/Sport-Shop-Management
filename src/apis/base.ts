import { handleResponse } from '@/helpers'
import { httpClient } from '@/services'

export default class BaseApi {
  protected route: string

  constructor(route: string) {
    this.route = route
  }

  async getAll<T>(
    count?: number,
    page?: number,
    optionalQuery?: Record<string, string | number | undefined>,
  ) {
    const data = await handleResponse<T[]>(() => {
      return httpClient.get<T[]>(this.route, {
        params: {
          count,
          page,
          ...optionalQuery,
        },
      })
    })
    return data
  }

  async getById<T>(id: string) {
    const data = await handleResponse<T>(() => httpClient.get<T>(`${this.route}/${id}`))
    return data
  }

  async create<T>(requestBody: T, options?: object) {
    const data = await handleResponse<{ message: string }>(() =>
      httpClient.post<{ message: string }>(this.route, requestBody as object, options),
    )
    return data?.message
  }

  async update<T>(requestBody: T, id: string, options?: object) {
    const data = await handleResponse<{ message: string }>(() =>
      httpClient.patch<{ message: string }>(`${this.route}/${id}`, requestBody as object, options),
    )
    return data?.message
  }

  async deleteById(id: string) {
    const data = await handleResponse<{ message: string }>(() =>
      httpClient.delete<{ message: string }>(`${this.route}/${id}`),
    )
    return data?.message
  }

  async deleteAll() {
    const data = await handleResponse<{ message: string }>(() =>
      httpClient.delete<{ message: string }>(this.route),
    )
    return data?.message
  }

  async restoreByDate(fromDate?: number) {
    const url = this.route + '/restore' + (fromDate ? `?fromDate=${fromDate}` : '')
    const data = await handleResponse<{ message: string }>(() =>
      httpClient.patch<{ message: string }>(url, {}),
    )
    return data?.message
  }
}
