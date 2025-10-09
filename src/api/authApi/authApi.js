import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from './api'
import { useAuth } from '@/app/[locale]/AuthProvider'

export const authService = {
  register: async ({ username, email, password }) => {
    const res = await api.post('/auth/register', {
      username,
      email,
      password,
      role: 'user',
    })

    return res.data
  },

  login: async ({ username, password }) => {
    const res = await api.post('auth/login', {
      username,
      password,
    })

    localStorage.setItem('accessToken', res.data['access_token'])

    const profile = await authService.getProfile()
    return profile
  },

  getProfile: async () => {
    const res = await api.get('users/me')

    return res.data
  },

  logout: async () => {
    await api.post('users/logout')
  },
}

export const useRegister = () => {
  return useMutation({
    mutationFn: authService.register,
  })
}

export const useLogin = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (userData) => {
      queryClient.setQueryData(['profile'], userData)
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  const { setUser } = useAuth()

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.removeQueries(['profile'])
      setUser(null)
      localStorage.removeItem('accessToken')
    },
  })
}
