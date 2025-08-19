import { lazy } from 'react'

const Brands = lazy(() => import('../../views/pages/brands'))

const DashboardRoutes = [
  {
    path: '/pages/brands',
    element: <Brands />,
  }
]

export default DashboardRoutes
