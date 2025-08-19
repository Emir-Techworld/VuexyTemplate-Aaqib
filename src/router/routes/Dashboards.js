import { lazy } from 'react'

const DashboardEcommerce = lazy(() => import('../../views/dashboard/ecommerce'))
const Brands = lazy(() => import('../../views/pages/brands'))

const DashboardRoutes = [
  {
    path: '/dashboard/ecommerce',
    element: <DashboardEcommerce />,
  },
  {
    path: '/pages/brands',
    element: <Brands />,
  }
]

export default DashboardRoutes
