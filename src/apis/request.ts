import { ROUTES } from '@/constants'
import { externalHooks } from '@/hooks'
import { ErrorResponse, RefreshTokenResponse } from '@/models'
import { getTokens, setTokens } from '@/utils'
import { notification } from 'antd'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import qs from 'qs'

const BASE_URL = import.meta.env.VITE_BASE_URL

const redirectToAuthPage = () => {
  externalHooks.authStore?.logout()
  externalHooks.navigate && externalHooks.navigate(ROUTES.AUTH.ROOT)
}

const refreshToken = async () => {
  const { refreshToken } = getTokens()
  if (!refreshToken) return redirectToAuthPage()
  try {
    const { data } = await axios
      .create({ baseURL: BASE_URL })
      .put<RefreshTokenResponse>('/auth/refresh-token', { refreshToken })
    if (!data) return false
    const { token } = data
    setTokens(token)
    return true
  } catch {
    redirectToAuthPage()
  }
}

// Common request
const request = axios.create({
  baseURL: BASE_URL,
})

request.interceptors.request.use(
  config => {
    const { accessToken } = getTokens()
    if (accessToken) {
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
      }
      config.params = {
        ...config.params,
      }
      config.paramsSerializer = {
        serialize: p => qs.stringify(p, { arrayFormat: 'repeat' }),
      }
    }
    return config
  },
  error => Promise.reject(error)
)

request.interceptors.response.use(
  response => response.data,
  async (error: AxiosError<ErrorResponse>) => {
    if (error.response?.status === 401) {
      const isRefreshSuccess = await refreshToken()
      if (isRefreshSuccess) {
        const {
          method,
          url,
          data: stringifyData,
          params,
        } = (error.toJSON() as AxiosError<ErrorResponse>)
          .config as AxiosRequestConfig
        const data = stringifyData ? JSON.parse(stringifyData) : stringifyData
        const { accessToken } = getTokens()
        const req = axios.create({
          baseURL: BASE_URL,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        const response = await req({
          method,
          url,
          data,
          params,
        })
        return response.data
      }
    }
    return Promise.reject(error)
  }
)
// Auth request
const authRequest = axios.create({
  baseURL: BASE_URL,
})

authRequest.interceptors.response.use(
  response => response.data,
  error => {
    const { message, error: err } = error.response.data
    notification.error({
      message: err,
      description: Array.isArray(message) ? message[0] : message,
    })

    return Promise.reject(error.response.data)
  }
)

export { request, authRequest }
