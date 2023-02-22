import { ROUTES } from '@/constants'
import { AuthLayout } from '@/layouts'
import { useAuthStore } from '@/stores'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from './Login'
import { Register } from './Register'

export const Auth: React.FC = () => {
  const { t } = useTranslation()
  const { user } = useAuthStore()

  if (user) {
    return <Navigate to="/" replace />
  }

  return (
    <Routes>
      <Route
        path={ROUTES.AUTH.LOGIN}
        element={
          <AuthLayout title={t('login.title')}>
            <Login />
          </AuthLayout>
        }
      />
      <Route
        path={ROUTES.AUTH.REGISTER}
        element={
          <AuthLayout title={t('register.title')}>
            <Register />
          </AuthLayout>
        }
      />
      <Route path="*" element={<Navigate to={ROUTES.AUTH.LOGIN} />} />
    </Routes>
  )
}
