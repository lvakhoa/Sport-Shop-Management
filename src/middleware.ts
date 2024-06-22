import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  // const cookies = req.cookies.get('connect.sid')

  // // Not logged in
  // if (!cookies) {
  //   return NextResponse.redirect('/login')
  // }

  // try {
  //   const getMe = await axios.get('/api/me', {
  //     headers: { cookie: `connect.sid=${cookies}` },
  //   })
  //   req.headers.set('x-user-role', JSON.stringify(getMe.data.role))
  // } catch (error: any) {
  //   // Invalid session
  //   if (error.response.status === 401) {
  //     return NextResponse.redirect('/login')
  //   }

  //   // Other errors
  //   return NextResponse.redirect(`/error?status=${error.response.status}`)
  // }

  return NextResponse.next()
}

export const config = {
  matcher: '/settings/:path*',
}
