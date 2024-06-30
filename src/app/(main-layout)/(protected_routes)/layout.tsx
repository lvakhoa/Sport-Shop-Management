import React, { useEffect } from 'react'
import { useAuth } from '@/hooks'
import { usePathname, useRouter } from 'next/navigation'
import { PATH_NAME } from '@/configs'

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  // const { isLoggedIn } = useAuth()
  // const router = useRouter()
  // const pathname = usePathname()

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     return router.replace(PATH_NAME.LOGIN + '?redirect=' + pathname)
  //   }
  // }, [isLoggedIn, router, pathname])

  return children
}

export default ProtectedLayout
