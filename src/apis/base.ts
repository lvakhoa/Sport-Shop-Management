import { handleResponse } from '@/helpers'
import { httpClient } from '@/services'

export default class BaseApi {
  protected route: string

  constructor(route: string) {
    this.route = route
  }

  async getAll<T>(count?: number, page?: number) {
    const data = await handleResponse<T[]>(() =>
      httpClient.get<T[]>(`${this.route}?count=${count}&page=${page}`),
    )
    return data
  }

  async getById<T>(id: string) {
    const data = await handleResponse<T>(() => httpClient.get<T>(`${this.route}/${id}`))
    return data
  }

  async create<T>(requestBody: T, options?: object) {
    const data = await handleResponse<{ message: string }>(() =>
      httpClient.post<{ message: string }>(
        this.route,
        {
          requestBody,
        },
        options,
      ),
    )
    return data?.message
  }

  async update<T>(requestBody: T, id: string, options?: object) {
    const data = await handleResponse<{ message: string }>(() =>
      httpClient.patch<{ message: string }>(
        `${this.route}/${id}`,
        {
          requestBody,
        },
        options,
      ),
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
}
