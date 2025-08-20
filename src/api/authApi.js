import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api, { refreshTokenRequest } from './api'

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET

const authService = {
  register: async ({ username, email, password, role }) => {
    const res = await api.post('/api/auth/register', {
      username,
      email,
      password,
      role,
    })
    return res.data
  },

  login: async ({ username, password }) => {
    const authHeader = btoa(`${clientId}:${clientSecret}`)
    const res = await api.post(
      '/oauth2/token',
      new URLSearchParams({
        grant_type: 'password',
        username,
        password,
        scope: 'read write',
      }),
      {
        headers: {
          Authorization: `Basic ${authHeader}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    localStorage.setItem('access_token', res.data.access_token)
    return res.data
  },

  logout: async () => {
    const token = localStorage.getItem('access_token')
    if (!token) return

    const authHeader = btoa(`${clientId}:${clientSecret}`)
    await api.post('/oauth2/revoke', new URLSearchParams({ token }), {
      headers: {
        Authorization: `Basic ${authHeader}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    localStorage.removeItem('access_token')
  },

  getProtected: async () => {
    const res = await api.get('/api/protected')
    return res.data
  },
}

export const useAuthQuery = (config) => {
  const queryClient = useQueryClient()

  return useQuery({
    ...config,
    queryFn: async (...args) => {
      try {
        return await config.queryFn(...args)
      } catch (error) {
        if (error.response?.status === 401) {
          try {
            const newToken = await refreshTokenRequest()
            queryClient.invalidateQueries()
            return await config.queryFn(...args)
          } catch (refreshError) {
            queryClient.invalidateQueries()
            throw refreshError
          }
        }
        throw error
      }
    },
  })
}

export const useRegister = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      queryClient.invalidateQueries(['auth'])
    },
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

export const useLogout = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.invalidateQueries(['protected'])
    },
  })
}

export const useProtectedData = () => {
  return useAuthQuery({
    queryKey: ['protected'],
    queryFn: authService.getProtected,
  })
}
