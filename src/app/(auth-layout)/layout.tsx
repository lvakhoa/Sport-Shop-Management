import { Suspense, useEffect } from 'react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>
}
