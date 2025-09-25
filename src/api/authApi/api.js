import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_AUTH_API_URL

const api = axios.create({
  baseURL: API_BASE_URL,
})

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true

//       try {
//         const refreshToken = localStorage.getItem('refreshToken')
//         if (!refreshToken) {
//           throw new Error('No refresh token available')
//         }

//         const refreshResponse = await axios.post(
//           `${API_BASE_URL}/auth/refresh`,
//           {
//             refresh_token: refreshToken,
//           }
//         )

//         const { access_token, refresh_token } = refreshResponse.data

//         localStorage.setItem('accessToken', access_token)

//         if (refresh_token) {
//           localStorage.setItem('refreshToken', refresh_token)
//         }

//         originalRequest.headers.Authorization = `Bearer ${access_token}`

//         return api(originalRequest)
//       } catch (refreshError) {
//         console.error('Token refresh failed:', refreshError)
//         localStorage.removeItem('accessToken')
//         localStorage.removeItem('refreshToken')
//         return Promise.reject(refreshError)
//       }
//     }

//     return Promise.reject(error)
//   }
// )

export default api
