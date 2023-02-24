import { LOCAL_STORAGE_KEYS } from '@/constants'
import { Token } from '@/models'

export const setTokens = (token: Token) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH.ACCESS_TOKEN, token.accessToken)
  localStorage.setItem(
    LOCAL_STORAGE_KEYS.AUTH.REFRESH_TOKEN,
    token.refreshToken
  )
}

export const getTokens = (): Token => {
  const accessToken =
    localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH.ACCESS_TOKEN) || ''
  const refreshToken =
    localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH.REFRESH_TOKEN) || ''
  return { accessToken, refreshToken }
}

export const clearTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH.ACCESS_TOKEN)
  localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH.REFRESH_TOKEN)
}

export const clearUserSetting = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.SETTING)
}
