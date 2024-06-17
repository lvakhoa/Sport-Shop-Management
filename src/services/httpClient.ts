import { authApi } from '@/apis'
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import _createAuthRefreshInterceptor, { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh'

class HttpClient {
  private baseUrl: string
  private instance: AxiosInstance

  constructor() {
    this.baseUrl = process.env.API_BASE_URL || 'http://localhost:8080/api/v1'
    this.instance = axios.create({
      baseURL: this.baseUrl,
      withCredentials: true,
      headers: {
        'access-control-allow-credentials': true,
        'access-control-expose-headers': 'set-cookie',
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

  setAuthHeader(token: string) {
    this.instance.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  removeAuthHeader() {
    delete this.instance.defaults.headers.common.Authorization
  }

  // createAuthInterceptor({
  //   onSuccess,
  //   onError,
  // }: {
  //   onSuccess: (accessToken: string, refreshToken: string) => void
  //   onError: () => void
  // }) {
  //   // this.instance.interceptors.request.use(
  //   //   async (config: InternalAxiosRequestConfig) => {
  //   //     const accessToken = localStorage.getItem('access_token') || ''
  //   //     config.headers.Authorization = `Bearer ${accessToken}`
  //   //     return config
  //   //   },
  //   //   (error) => {
  //   //     Promise.reject(error)
  //   //   },
  //   // )

  //   this.instance.interceptors.response.use(
  //     (response: AxiosResponse) => {
  //       return response
  //     },
  //     async (error) => {
  //       try {
  //         const originalRequest = error.config
  //         if (error.response.status === 401 && !originalRequest._retry) {
  //           originalRequest._retry = true
  //           const refreshToken = localStorage.getItem('refresh_token')
  //           const data = await authApi.refreshToken(refreshToken ?? '')
  //           if (!!data.accessToken && !!data.refreshToken) {
  //             axios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`
  //             onSuccess(data.accessToken, data.refreshToken)
  //           }
  //           return this.instance(originalRequest)
  //         }
  //       } catch (error: any) {
  //         onError()
  //       }
  //       return Promise.reject(error)
  //     },
  //   )
  // }

  createAuthInterceptor({
    onSuccess,
    onError,
  }: {
    onSuccess: (accessToken: string, refreshToken: string) => void
    onError: () => void
  }) {
    this.instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const accessToken = localStorage.getItem('access_token') || ''
        if (!!config && !!config.headers) {
          config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
      },
      (error) => {
        Promise.reject(error)
      },
    )

    _createAuthRefreshInterceptor(
      this.instance,
      async (failedRequest) => {
        try {
          const refreshToken = localStorage.getItem('refresh_token')
          const data = await authApi.refreshToken(refreshToken ?? '')
          if (!!data.accessToken && !!data.refreshToken) {
            failedRequest.response.config.headers['Authorization'] = 'Bearer ' + data.accessToken
            onSuccess(data.accessToken, data.refreshToken)
          }

          return Promise.resolve()
        } catch (error) {
          onError()
          return Promise.reject(error)
        }
      },
      {
        pauseInstanceWhileRefreshing: true,
        statusCodes: [401],
      },
    )
  }
}

const httpClient = new HttpClient()

export default httpClient
