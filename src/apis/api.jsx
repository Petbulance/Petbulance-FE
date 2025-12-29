import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
})
console.log(import.meta.env.VITE_API_URL)
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('ACCESS_TOKEN')
    try {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
      return config
    } catch (error) {
      console.error(error)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default api
