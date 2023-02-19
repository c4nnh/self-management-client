import { Route, Routes } from 'react-router-dom'
import { useGetManyCurrencies, useMeQuery } from './apis'
import { Loading } from './components'
import { ROUTES } from './constants'
import { Auth, Private } from './pages'
import { useAuthStore, useCurrencyStore } from './stores'
import { getTokens } from './utils'

function App() {
  const { me, user } = useAuthStore()
  const { setCurrencies } = useCurrencyStore()

  const tokens = getTokens()

  const { isFetching: isFetchingUser } = useMeQuery({
    enabled: !!tokens && !!tokens.accessToken && !user,
    onSuccess: me,
  })
  const { isFetching: isFetchingCurrencies } = useGetManyCurrencies(
    { isPaged: false },
    {
      enabled: !!tokens && !!tokens.accessToken && !user,
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
