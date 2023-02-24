import { AUTH_KEYS } from '@/constants'
import { Token } from '@/models'

export const setTokens = (token: Token) => {
  localStorage.setItem(AUTH_KEYS.ACCESS_TOKEN, token.accessToken)
  localStorage.setItem(AUTH_KEYS.REFRESH_TOKEN, token.refreshToken)
}

export const getTokens = (): Token => {
  const accessToken = localStorage.getItem(AUTH_KEYS.ACCESS_TOKEN) || ''
  const refreshToken = localStorage.getItem(AUTH_KEYS.REFRESH_TOKEN) || ''
  return { accessToken, refreshToken }
}

export const clearTokens = () => {
  localStorage.removeItem(AUTH_KEYS.ACCESS_TOKEN)
  localStorage.removeItem(AUTH_KEYS.REFRESH_TOKEN)
}
