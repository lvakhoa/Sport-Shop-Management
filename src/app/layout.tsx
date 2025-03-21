import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { cn } from '@/lib/utils'
import Providers from '@/components/providers'

const inter = Nunito({ subsets: ['vietnamese'] })

export const metadata: Metadata = {
  title: 'Clothy Shop',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={cn(inter.className, 'scrollbar')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
