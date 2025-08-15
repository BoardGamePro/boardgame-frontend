import api from './api'

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET

export const register = async ({ username, email, password, role }) => {
  const res = await api.post('/api/auth/register', {
    username,
    email,
    password,
    role,
  })
  return res.data
}

export const login = async ({ username, password }) => {
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
}

export const logout = async () => {
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
}

export const getProtected = async () => {
  const res = await api.get('/api/protected')
  return res.data
}
