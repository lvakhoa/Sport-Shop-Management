import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ADMIN_PATH_NAME, AUTH_PATH_NAME, PATH_NAME } from './configs'
import { jwtDecode } from 'jwt-decode'
import { ROLE_TITLE } from './configs/enum'
import { MANAGER_PATH_NAME, PUBLIC_PATH_NAME } from './configs/pathName'

export default function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname
  const token = request.cookies.get('access_token')?.value

  if (!token && !AUTH_PATH_NAME.includes(pathName))
    return NextResponse.redirect(new URL(PATH_NAME.LOGIN, request.url))

  if (!!token) {
    if (pathName.startsWith(PATH_NAME.LOGIN))
      return NextResponse.redirect(new URL(PATH_NAME.HOME, request.url))

    const user = jwtDecode<any>(token)
    if (user.roleName === ROLE_TITLE.ADMIN && ADMIN_PATH_NAME.includes(pathName))
      return NextResponse.next()
    else if (user.roleName === ROLE_TITLE.MANAGER && MANAGER_PATH_NAME.includes(pathName))
      return NextResponse.next()
    else if (user.roleName === ROLE_TITLE.EMPLOYEE && PUBLIC_PATH_NAME.includes(pathName))
      return NextResponse.next()
    else return NextResponse.redirect(new URL('/not-found', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|assets|icons).*)',
  ],
}
