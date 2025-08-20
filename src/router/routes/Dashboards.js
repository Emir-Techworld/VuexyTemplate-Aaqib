import { lazy } from 'react'

const Brands = lazy(() => import('../../views/admin/brands'))

const DashboardRoutes = [
  {
    path: '/admin/brands',
    element: <Brands />,
  }
]

export default DashboardRoutes
