'use client'

import { authApi } from '@/apis'
import { PATH_NAME } from '@/configs'
import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

function Verification() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const { mutate: verify } = useMutation({
    mutationFn: (token: string) => authApi.verifyEmail(token),
    onSuccess: () => {
      router.push(PATH_NAME.VERIFICATION_SUCCESS)
    },
    onError: () => {
      router.push(PATH_NAME.VERIFICATION_ERROR)
    },
  })
  const count = useRef<number | null>(null)

  useEffect(() => {
    if (count.current == null) verify(token ?? '')
    return () => {
      count.current = 1
    }
  }, [verify, token])

  return <div>{/* thêm loading các kiểu */}</div>
}

export default Verification
