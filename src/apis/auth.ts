import { handleResponse } from '@/helpers'
import { IInfo, IPerson, ITokenResponse } from '@/interfaces'
import { handleError, httpClient } from '@/services'

class AuthApi {
  // async logIn(email: string, password: string) {
  //   try {
  //     const data = await httpClient.post<{ access_token: string, refresh_token: string }>('/auth/log-in', {
  //       email,
  //       password
  //     })
  //     return { accessToken: data.access_token, refreshToken: data.refresh_token }
  //   } catch (error) {
  //     handleError(error, (res) => {
  //       throw new HttpException(res.data.status, res.data.message)
  //     })
  //   }
  // }

  async logIn(email: string, password: string) {
    const data = await handleResponse<ITokenResponse>(() =>
      httpClient.post<ITokenResponse>('/auth/log-in', {
        email,
        password,
      }),
    )
    return { accessToken: data?.access_token, refreshToken: data?.refresh_token }
  }

  async verifyEmail(token: string) {
    const data = await handleResponse<{ message: string }>(() =>
      httpClient.post<{ message: string }>('/auth/verify-email', {
        token,
      }),
    )
    return data?.message
  }

  async resendVerification(email: string) {
    const data = await handleResponse<{ message: string }>(() =>
      httpClient.post<{ message: string }>('/auth/resend-verification', {
        email,
      }),
    )
    return data?.message
  }

  async getMe() {
    const data = await handleResponse<IPerson>(() => httpClient.get<IPerson>('/auth/get-me'))
    return {
      id: data?.id,
      fullname: data?.fullname,
      phone: data?.phone,
      email: data?.email,
      gender: data?.gender,
      rank: data?.rank,
      loyaltyPoint: data?.loyalty_point,
    }
  }

  async updateInfo(info: IInfo) {
    const data = await handleResponse<{ message: string }>(() =>
      httpClient.patch<{ message: string }>('/auth/update-info', info),
    )
    return data?.message
  }

  async refreshToken(refreshToken: string) {
    const data = await handleResponse<ITokenResponse>(() =>
      httpClient.post<ITokenResponse>(
        '/auth/refresh-token',
        {
          refresh_token: refreshToken,
        },
        {
          validateStatus: null,
        },
      ),
    )
    return { accessToken: data?.access_token, refreshToken: data?.refresh_token }
  }

  async logOut(refreshToken: string) {
    const data = await handleResponse<{ message: string }>(() =>
      httpClient.delete<{ message: string }>('/auth/log-out', {
        headers: {
          Cookie: `refresh_token=${refreshToken}`,
        },
        validateStatus: null,
      }),
    )
    return data?.message
  }

  async forgotPassword(email: string) {
    const data = await handleResponse<{ message: string }>(() =>
      httpClient.post<{ message: string }>('/auth/forgot-password', {
        email,
      }),
    )
    return data?.message
  }

  async resetPassword(token: string, newPassword: string) {
    const data = await handleResponse<{ message: string }>(() =>
      httpClient.post<{ message: string }>('/auth/reset-password', {
        token,
        new_password: newPassword,
      }),
    )
    return data?.message
  }
}

const authApi = new AuthApi()

export default authApi
