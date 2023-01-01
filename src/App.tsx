import { Route, Routes } from 'react-router-dom'
import { useMeQuery } from './apis'
import { AppLoading } from './components'
import { ROUTES } from './constants'
import { Auth, Private } from './pages'
import { useAuthStore } from './stores'
import { getTokens } from './utils'

function App() {
  const { me, user } = useAuthStore()

  const tokens = getTokens()

  const { isFetching } = useMeQuery({
    enabled: !!tokens && !!tokens.accessToken && !user,
    onSuccess: me,
  })

  if (isFetching) {
    return <AppLoading />
  }

  return (
    <Routes>
      <Route path={`/${ROUTES.AUTH.ROOT}/*`} element={<Auth />} />
      <Route path="/*" element={<Private />} />
    </Routes>
  )
}

export default App
