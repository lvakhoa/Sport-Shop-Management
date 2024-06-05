import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth'
import { queryKeys } from '@/configs'
import { authApi } from '@/apis'

const useProfile = () => {
  const { accessToken } = useAuth()

  return useQuery({
    queryKey: queryKeys.profile.gen(accessToken ?? ''),
    queryFn: () => authApi.getMe(),
    enabled: !!accessToken,
  })
}

export default useProfile
