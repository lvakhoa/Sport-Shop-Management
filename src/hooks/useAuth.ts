'use client'

import { authApi } from '@/apis'
import { PATH_NAME } from '@/configs'
import { httpClient } from '@/services'
import { useAuthStore } from '@/stores'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const useAuth = () => {
  const accessToken = useAuthStore((state) => state.accessToken)
  const setAccessToken = useAuthStore((state) => state.setAccessToken)
  const refreshToken = useAuthStore((state) => state.refreshToken)
  const setRefreshToken = useAuthStore((state) => state.setRefreshToken)
  const router = useRouter()

  const logIn = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.logIn(email, password),
    onSuccess: (data) => {
      if (!!data.accessToken && !!data.refreshToken) {
        toast.success('Log in successfully')
        httpClient.setAuthHeader(data.accessToken)
        localStorage.setItem('access_token', data.accessToken)
        localStorage.setItem('refresh_token', data.refreshToken)
        setAccessToken(data.accessToken)
        setRefreshToken(data.refreshToken)
        router.replace(PATH_NAME.HOME)
      }
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const { mutate: logOut } = useMutation({
    mutationFn: () => authApi.logOut(refreshToken!),
    onSuccess: () => {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      setAccessToken('')
      setRefreshToken('')
      httpClient.removeAuthHeader()
      router.replace(PATH_NAME.LOGIN)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  useEffect(() => {
    setAccessToken(localStorage.getItem('access_token') ?? '')
    setRefreshToken(localStorage.getItem('refresh_token') ?? '')
  }, [setAccessToken, setRefreshToken])

  useEffect(() => {
    if (!!accessToken) {
      httpClient.setAuthHeader(accessToken)
      localStorage.setItem('access_token', accessToken)
    }
  }, [accessToken])

  useEffect(() => {
    httpClient.createAuthInterceptor({
      onSuccess: (accessToken, refreshToken) => {
        httpClient.setAuthHeader(accessToken)
        localStorage.setItem('access_token', accessToken)
        localStorage.setItem('refresh_token', refreshToken)
        setAccessToken(accessToken)
        setRefreshToken(refreshToken)
      },
      onError: () => {
        toast.error('Your log in session has expired, please log in again')
        logOut()
      },
    })
  }, [setAccessToken, setRefreshToken, logOut])

  return {
    isLoggedIn: accessToken === null || !!accessToken,
    logIn,
    logOut,
    accessToken,
    refreshToken,
    setAccessToken,
    setRefreshToken,
  }
}

export default useAuth
