import { ROUTES } from '@/constants'
import { Role } from '@/models'
import { useAuthStore } from '@/stores'
import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

type Props = PropsWithChildren & {
  roles?: Role[]
}

export const AuthorizedLayout: React.FC<Props> = ({ roles = [], children }) => {
  const { user } = useAuthStore()

  if (user?.role && !roles.includes(user.role)) {
    return <Navigate to={`/${ROUTES.PRIVATE.UNAUTHORIZED}`} replace />
  }

  return <>{children}</>
}
