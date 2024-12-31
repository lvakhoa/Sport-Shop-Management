import { PATH_NAME } from '@/configs'
import { ROLE_NAME } from '@/configs/enum'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function verifySession() {
  const token = cookies().get('access_token')?.value

  if (!token) {
    redirect(PATH_NAME.LOGIN)
  }
  const user = jwtDecode<any>(token)

  return { isAuth: true, role: user.roleName as ROLE_NAME }
}
