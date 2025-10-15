import { useAuth } from '@/app/[locale]/AuthProvider'
import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_AUTH_API_URL

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken && config.url !== '/auth/refresh') {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== '/auth/logout'
    ) {
      originalRequest._retry = true

      try {
        const res = await api.post('/auth/refresh', {})

        const newAccessToken = res.data.access_token

        localStorage.setItem('accessToken', newAccessToken)

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        localStorage.removeItem('accessToken')
        const { user, setUser } = useAuth()
        console.log(user)
        setUser(null)

        console.error(
          'Refresh failed:',
          refreshError.response?.data || refreshError.message
        )
      }
    }

    return Promise.reject(error)
  }
)

export default api
