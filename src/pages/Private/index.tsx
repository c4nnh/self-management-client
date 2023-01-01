import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from '../../constants'
import { PrivateLayout } from '../../layouts'
import { useAuthStore } from '../../stores'
import { Asset } from './Asset'
import { Event } from './Event'
import { Finance } from './Finance'
import { Profile } from './Profile'
import { Project, Resume, Skill } from './Work'

export const Private: React.FC = () => {
  const { user } = useAuthStore()

  if (!user) {
    return <Navigate to={`/${ROUTES.AUTH.ROOT}`} replace />
  }

  return (
    <PrivateLayout>
      <Routes>
        <Route path={ROUTES.PRIVATE.PROFILE} element={<Profile />} />
        <Route path={ROUTES.PRIVATE.FINANCE} element={<Finance />} />
        <Route path={ROUTES.PRIVATE.RESUME} element={<Resume />} />
        <Route path={ROUTES.PRIVATE.SKILL} element={<Skill />} />
        <Route path={ROUTES.PRIVATE.PROJECT} element={<Project />} />
        <Route path={ROUTES.PRIVATE.EVENT} element={<Event />} />
        <Route path={ROUTES.PRIVATE.ASSET} element={<Asset />} />
        <Route path="*" element={<Navigate to={ROUTES.PRIVATE.PROFILE} />} />
      </Routes>
    </PrivateLayout>
  )
}
