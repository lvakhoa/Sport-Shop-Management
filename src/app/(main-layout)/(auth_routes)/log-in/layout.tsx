'use client'

import { PATH_NAME } from '@/configs'
import { useAuth } from '@/hooks'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'

export default function LogInLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect')

  useEffect(() => {
    if (isLoggedIn) {
      if (redirect) {
        router.replace(redirect)
      } else {
        router.replace(PATH_NAME.HOME)
      }
    }
  }, [isLoggedIn, redirect, router])

  return children
}
