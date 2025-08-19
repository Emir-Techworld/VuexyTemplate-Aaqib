import { lazy } from 'react'

import { useRoutes, Navigate } from 'react-router-dom'

import { getUserData, getHomeRouteForLoggedInUser } from '../utility/Utils'

// ** GetRoutes
import { getRoutes } from './routes'

// ** Components
const Login = lazy(() => import('../views/pages/authentication/Login'))

const Router = () => {
  const allRoutes = getRoutes()

  const getHomeRoute = () => {
    const user = getUserData()
    if (user) {
      return getHomeRouteForLoggedInUser()
    } else {
      return '/login'
    }
  }

  const routes = useRoutes([
    {
      path: '/',
      index: true,
      element: <Navigate replace to={getHomeRoute()} />
    },
    {
      path: '/login',
      children: [{ path: '/login', element: <Login /> }]
    },
    ...allRoutes
  ])

  return routes
}

export default Router
