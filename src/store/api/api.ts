import axios from 'axios'
import LocalStorage from '../../types/LocalStorage'

const api = axios.create({
  baseURL: process.env.REACT_APP_HOST
    ? `${process.env.REACT_APP_HOST}/api`
    : 'api',
})

api.interceptors.request.use(config => {
  if (config.url === '/login') {
    return config
  }

  const credentials = LocalStorage.readCredentials()

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: credentials
        ? `Token ${credentials.token}`
        : undefined,
    },
  }
})

export default api
