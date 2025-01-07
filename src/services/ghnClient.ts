import axios, { AxiosInstance } from 'axios'
import _createAuthRefreshInterceptor, { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh'

class GhnClient {
  private baseUrl: string
  private instance: AxiosInstance

  constructor() {
    this.baseUrl = process.env.GHN_BASE_URL || 'http://localhost:8080/api/v1'
    this.instance = axios.create({
      baseURL: this.baseUrl,
      withCredentials: true,
      headers: {
        Token: process.env.GHN_TOKEN_API,
      },
    })
  }

  private getUrl(endpoint: string): string {
    return this.baseUrl + endpoint
  }

  async get<T>(endpoint: string, config?: AxiosAuthRefreshRequestConfig) {
    const response = await this.instance.get<T>(this.getUrl(endpoint), config)
    return response.data
  }

  async post<T>(endpoint: string, data: object, config?: AxiosAuthRefreshRequestConfig) {
    const response = await this.instance.post<T>(this.getUrl(endpoint), data, config)
    return response.data
  }

  async patch<T>(endpoint: string, data: object, config?: AxiosAuthRefreshRequestConfig) {
    const response = await this.instance.patch<T>(this.getUrl(endpoint), data, config)
    return response.data
  }

  async delete<T>(endpoint: string, config?: AxiosAuthRefreshRequestConfig) {
    const response = await this.instance.delete<T>(this.getUrl(endpoint), config)
    return response.data
  }
}

const ghnClient = new GhnClient()

export default ghnClient
