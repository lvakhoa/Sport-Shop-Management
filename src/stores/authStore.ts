import * as zustand from 'zustand'

interface State {
  accessToken: string | null
  refreshToken: string | null
}

interface Action {
  setAccessToken: (accessToken: string | null) => void
  setRefreshToken: (refreshToken: string | null) => void
}

const useAuthStore = zustand.create<State & Action>((set) => ({
  accessToken: null,
  refreshToken: null,
  setAccessToken: (accessToken: string | null) => set({ accessToken }),
  setRefreshToken: (refreshToken: string | null) => set({ refreshToken }),
}))

export default useAuthStore
