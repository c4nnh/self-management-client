import { ROUTES } from '@/constants'
import { PrivateLayout } from '@/layouts'
import { useAuthStore } from '@/stores'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Account } from './Account'
import { Asset } from './Asset'
import { Event } from './Event'
import { Loan, Tontine, Transaction } from './Finance'
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
        {/* Work */}
        <Route path={ROUTES.PRIVATE.RESUME} element={<Resume />} />
        <Route path={ROUTES.PRIVATE.SKILL} element={<Skill />} />
        <Route path={ROUTES.PRIVATE.PROJECT} element={<Project />} />
        {/* Event */}
        <Route path={ROUTES.PRIVATE.EVENT} element={<Event />} />
        {/* Asset */}
        <Route path={ROUTES.PRIVATE.ASSET} element={<Asset />} />
        <Route
          path="*"
          element={<Navigate to={ROUTES.PRIVATE.TRANSACTION} />}
        />
      </Routes>
    </PrivateLayout>
  )
}
