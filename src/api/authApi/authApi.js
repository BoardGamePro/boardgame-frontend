import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api, { refreshTokenRequest } from './api'
import { generateCodeChallenge, generateRandomString } from '@/utils/pkce'

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET

const authService = {
  register: async ({ username, email, password }) => {
    const res = await api.post('/auth/register', {
      username,
      email,
      password,
    })
    return res.data
  },

  login: async () => {
    console.log('Starting PKCE login...')
    const codeVerifier = generateRandomString(128)
    localStorage.setItem('code_verifier', codeVerifier)
    const codeChallenge = await generateCodeChallenge(codeVerifier)
    console.log(
      'Code verifier:',
      codeVerifier,
      'Code challenge:',
      codeChallenge
    )

    const authParams = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      redirect_uri: 'http://localhost:3000/callbackAuth',
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      scope: 'games:read games:write',
    })

    window.location.assign(
      `http://127.0.0.1:8080/oauth2/authorize?${authParams.toString()}`
    )
  },

  exchangeCodeForToken: async (code) => {
    const codeVerifier = localStorage.getItem('code_verifier')
    if (!codeVerifier) throw new Error('Code verifier not found')

    const authHeader = btoa(`${clientId}:${clientSecret}`)
    const res = await api.post(
      tokenUrl,
      new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: clientId,
        code_verifier: codeVerifier,
        code,
        redirect_uri: 'http://localhost:3000/callbackAuth',
      }),
      {
        headers: {
          Authorization: `Basic ${authHeader}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    localStorage.setItem('access_token', res.data.access_token)
    localStorage.setItem('refresh_token', res.data.refresh_token)
    localStorage.removeItem('code_verifier')
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

export const useExchangeCode = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: authService.exchangeCodeForToken,
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
