'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      retry: false,
    },
  },
})

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToastContainer
        closeOnClick
        position='top-right'
        autoClose={3000}
        hideProgressBar
        theme='colored'
      />
    </QueryClientProvider>
  )
}
