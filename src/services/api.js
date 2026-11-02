import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

if (!API_URL) {
  throw new Error('VITE_API_URL belum ada di .env')
}

export { API_URL }

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('user_id')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  if (userId) {
    config.headers['x-user-id'] = userId
  } else if (user?.id) {
    config.headers['x-user-id'] = user.id
  }

  if (config.data instanceof FormData) {
    delete config.headers['Content-Type']
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      error.message = 'Request timeout (30 detik). Server tidak merespons.'
    } else if (error.code === 'ERR_NETWORK' || !error.response) {
      error.message = 'Tidak dapat terhubung ke server. Cek koneksi atau server backend.'
    } else if (error.response?.status === 401) {
      error.message = error.response?.data?.message || 'Sesi login tidak valid atau sudah berakhir.'
    } else if (error.response?.status === 403) {
      error.message = error.response?.data?.message || 'Akses ditolak.'
    } else if (error.response?.status === 413) {
      error.message = 'File terlalu besar (maks 10MB).'
    } else if (error.response?.data?.message) {
      error.message = error.response.data.message
    }
    return Promise.reject(error)
  }
)

export default api
