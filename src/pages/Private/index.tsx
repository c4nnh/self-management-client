import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from '../../constants'
import { useAuthStore } from '../../stores'
import { Finance } from './Finance'
import { Profile } from './Profile'

export const Private: React.FC = () => {
  const { user } = useAuthStore()

  if (!user) {
    return <Navigate to={`/${ROUTES.AUTH.ROOT}`} replace />
  }

  return (
    <Routes>
      <Route path={ROUTES.PRIVATE.PROFILE} element={<Profile />} />
      <Route path={ROUTES.PRIVATE.FINANCE} element={<Finance />} />
      <Route path="*" element={<Navigate to={ROUTES.PRIVATE.PROFILE} />} />
    </Routes>
  )
}
