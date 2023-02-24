import { ROUTES } from '@/constants'
import { PrivateLayout } from '@/layouts'
import { AuthorizedLayout } from '@/layouts/Authorized'
import { Role } from '@/models'
import { useAuthStore } from '@/stores'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Account } from './Account'
import { Asset } from './Asset'
import { UnauthorizedPage } from './Error'
import { Event } from './Event'
import { Currency, Loan, Tontine, Transaction } from './Finance'
import { Project, Resume, Skill } from './Work'

export const Private: React.FC = () => {
  const { user } = useAuthStore()

  if (!user) {
    return <Navigate to={`/${ROUTES.AUTH.ROOT}`} replace />
  }

  return (
    <PrivateLayout>
      <Routes>
        {/* Profile */}
        <Route path={ROUTES.PRIVATE.ACCOUNT} element={<Account />} />
        {/* Finance */}
        <Route path={ROUTES.PRIVATE.TRANSACTION} element={<Transaction />} />
        <Route path={ROUTES.PRIVATE.LOAN} element={<Loan />} />
        <Route path={ROUTES.PRIVATE.TONTINE} element={<Tontine />} />
        <Route
          path={ROUTES.PRIVATE.CURRENCY}
          element={
            <AuthorizedLayout roles={[Role.ADMIN]}>
              <Currency />
            </AuthorizedLayout>
          }
        />
        {/* Work */}
        <Route path={ROUTES.PRIVATE.RESUME} element={<Resume />} />
        <Route path={ROUTES.PRIVATE.SKILL} element={<Skill />} />
        <Route path={ROUTES.PRIVATE.PROJECT} element={<Project />} />
        {/* Event */}
        <Route path={ROUTES.PRIVATE.EVENT} element={<Event />} />
        {/* Asset */}
        <Route path={ROUTES.PRIVATE.ASSET} element={<Asset />} />
        {/* Error */}
        <Route
          path={ROUTES.PRIVATE.UNAUTHORIZED}
          element={<UnauthorizedPage />}
        />
        <Route
          path="*"
          element={<Navigate to={ROUTES.PRIVATE.TRANSACTION} />}
        />
      </Routes>
    </PrivateLayout>
  )
}
