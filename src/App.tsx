import { useGetCurrenciesQuery, useMeQuery } from '@/apis'
import { Loading } from '@/components'
import { ROUTES } from '@/constants'
import { Auth, Private } from '@/pages'
import { useAppStore, useAuthStore, useCurrencyStore } from '@/stores'
import { clearTokens, getColumnLabel, getTokens } from '@/utils'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Route, Routes } from 'react-router-dom'

function App() {
  const { t } = useTranslation()
  const { user, me } = useAuthStore()
  const { setCurrencies } = useCurrencyStore()
  const { setColumnLabel } = useAppStore()

  useEffect(() => {
    setColumnLabel(getColumnLabel(t))
  }, [t])

  const tokens = getTokens()

  const { isFetching: isFetchingUser } = useMeQuery({
    enabled: !!tokens && !!tokens.accessToken && !user,
    onSuccess: me,
    onError: () => {
      clearTokens()
    },
  })
  const { isFetching: isFetchingCurrencies } = useGetCurrenciesQuery(
    { isPaged: false },
    {
      enabled: !!user,
      onSuccess: data => {
        setCurrencies(data.items)
      },
    }
  )

  if (isFetchingUser || isFetchingCurrencies) {
    return <Loading />
  }

  return (
    <Routes>
      <Route path={`/${ROUTES.AUTH.ROOT}/*`} element={<Auth />} />
      <Route path="/*" element={<Private />} />
    </Routes>
  )
}

export default App
