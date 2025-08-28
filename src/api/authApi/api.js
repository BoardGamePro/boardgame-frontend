import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const api = axios.create({
  baseURL: API_BASE_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

export const refreshTokenRequest = async () => {
  const refresh_token = localStorage.getItem('refresh_token')
  if (!refresh_token) throw new Error('Нет доступного refresh-токена')

  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID
  const clientSecret = process.env.CLIENT_SECRET
  const authHeader = btoa(`${clientId}:${clientSecret}`)

  const res = await axios.post(
    `${API_BASE_URL}/oauth2/token`,
    new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
    {
      headers: {
        Authorization: `Basic ${authHeader}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )

  return res.data
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return api(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const data = await refreshTokenRequest()
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('refresh_token', data.refresh_token)

        originalRequest.headers.Authorization = `Bearer ${data.access_token}`
        processQueue(null, data.access_token)
        return api(originalRequest)
      } catch (err) {
        processQueue(err, null)
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api
