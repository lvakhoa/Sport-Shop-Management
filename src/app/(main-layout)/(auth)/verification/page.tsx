'use client'

import { authApi } from '@/apis'
import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

function Verification() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const { mutate } = useMutation({
    mutationFn: () => authApi.verifyEmail(token!),
    onSuccess: () => {
      router.push('/verification-success')
    },
    onError: () => {
      router.push('/verification-error')
    },
  })

  useEffect(() => {
    mutate()
  }, [mutate])

  return <div>{/* thêm loading các kiểu */}</div>
}

export default Verification
