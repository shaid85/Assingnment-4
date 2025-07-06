// components/PrivateRoute.tsx
import type { JSX } from 'react'
import { Navigate, useLocation } from 'react-router'

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!localStorage.getItem('token') // or context-based
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default PrivateRoute
