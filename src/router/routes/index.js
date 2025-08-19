// ** React Imports
import { Fragment } from 'react'

// ** Routes Imports
import DashboardRoutes from './Dashboards'

// ** Layouts
import VerticalLayout from '@src/layouts/VerticalLayout'
import LayoutWrapper from '@src/@core/layouts/components/layout-wrapper'

// ** Utils
import { isObjEmpty } from '@utils'

// ** Title & Default Route
const TemplateTitle = '%s - Vuexy React Admin Template'
const DefaultRoute = '/pages/brands'

// ** All Routes
const Routes = [...DashboardRoutes]

// ** Get route meta
const getRouteMeta = (route) => {
  return route.meta ? { routeMeta: route.meta } : {}
}

// ** Merge layout routes for 'vertical' layout only (no auth wrappers)
const MergeLayoutRoutes = () => {
  const layoutRoutes = []

  Routes.forEach((route) => {
    const layoutType = route.meta?.layout || 'vertical'

    if (layoutType === 'vertical') {
      const isBlank = layoutType === 'blank'

      const Wrapper =
        isObjEmpty(route.element?.props) && !isBlank
          ? LayoutWrapper
          : Fragment

      // Directly wrap with LayoutWrapper (no auth logic)
      route.element = (
        <Wrapper {...(!isBlank ? getRouteMeta(route) : {})}>
          {route.element}
        </Wrapper>
      )

      layoutRoutes.push(route)
    }
  })

  return layoutRoutes
}

// ** Final route structure using only vertical layout
const getRoutes = () => {
  return [
    {
      path: '/',
      element: <VerticalLayout />,
      children: MergeLayoutRoutes()
    }
  ]
}

export { DefaultRoute, TemplateTitle, Routes, getRoutes }
