import { lazy } from 'react'

import { useRoutes, Navigate } from 'react-router-dom'

import { getHomeRouteForLoggedInUser } from '../utility/Utils'

// ** GetRoutes
import { getRoutes } from './routes'

// ** Components
const Login = lazy(() => import('../views/pages/authentication/Login'))

const Router = () => {
  const allRoutes = getRoutes()

  const routes = useRoutes([
    {
      path: '/',
      index: true,
      element: <Navigate replace to={getHomeRouteForLoggedInUser()} />
    },
    {
      path: '/login',
      element: <Login />
    },
    ...allRoutes
  ])

  return routes
}

export default Router
