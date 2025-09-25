import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from './api'

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
    localStorage.setItem('refreshToken', res.data['refresh_token'])
  },

  getProfile: async () => {
    const res = await api.get('users/me')

    return res.data
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
    onSuccess: () => {
      queryClient.invalidateQueries(['protected'])
    },
  })
}
