import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
})

api.interceptors.request.use(config => {
  if (config.url === '/login') {
    return config
  }

  const auth = localStorage.getItem('auth')
  ? JSON.parse(localStorage.getItem('auth') as string)
  : undefined

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Token ${auth?.data?.token}`,
    },
  }
})

export default api
